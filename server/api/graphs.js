const router = require('express').Router()
const { Graph, YAxis } = require('../db/models')
const axios = require('axios')
const { AWS_KEY, AWS_SECRET } = require('../../secrets')
const AWS = require('aws-sdk')
// set all the keys and region here
AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: 'us-east-2'
})
const bucketName = 'graphify-test-22'
const keyName = 'test4.csv'

module.exports = router

router.get('/:graphId', (req, res, next) => {
    //in models graphid is string should it be a number??????
    const { graphId } = req.params
    const userId = req.user ? req.user.dataValues.id : undefined
    Graph.findById(graphId, {
        include: [{ model: YAxis }]
    })
        .then(graph => {
            let shareable = graph.shareable
            let feedback = "You don't have permission to view this graph"
            if (shareable) {
                feedback = graph
            }
            if (!shareable) {
                if (graph.userId === userId) {
                    feedback = graph
                }
            }
            res.json(feedback)
        })
        .catch(next)
})

router.post('/:graphId', (req, res, next) => {
    if (req.user) {
        const { graphId } = req.params
        const {
            xAxis,
            yAxis,
            xAxisLabel,
            yAxisLabel,
            title,
            graphType,
            shareable
        } = req.body
        const userId = req.user.id

        Graph.findOne({ where: { graphId } })
            .then(foundGraph => {
                let recentGraph
                if (foundGraph) {
                    recentGraph = foundGraph.update({
                        userId,
                        xAxis,
                        xAxisLabel,
                        yAxisLabel,
                        title,
                        graphType,
                        shareable
                    })
                } else {
                    recentGraph = Graph.create({
                        userId,
                        graphId,
                        xAxis,
                        xAxisLabel,
                        yAxisLabel,
                        title,
                        graphType,
                        shareable
                    })
                }
                return recentGraph
            })
            .then(returnedGraph => {
                //this always creates new Yaxis doesn't update this is an issue
                // ---------------------------
                Promise.all(
                    yAxis.map(name => {
                        return YAxis.create({ name })
                    })
                ).then(newYAxis => {
                    returnedGraph.setYAxes(newYAxis)
                })
            })
            .catch(next)
    } else {
        res.send('You need to be a user to save graph data')
    }
})

router.get('/aws/:graphId', (req, res, next) => {
    //have some kind of security so that we don't do this if the user doesn't have access to the graph
    const { graphId } = req.params
    let datasetParams = { Bucket: bucketName, Key: graphId }
    //this makes the promise to do the actual request, get object is a get request
    let findDatasetPromise = new AWS.S3({ apiVersion: '2006-03-01' })
        .getObject(datasetParams)
        .promise()
    findDatasetPromise
        .then(result => {
            let parsedDataset = JSON.parse(result.Body)
            res.json(parsedDataset)
        })
        .catch(next)
})

router.post('/aws/:graphId', (req, res, next) => {
    if (req.user) {
        console.log('user and in route')
        const { graphId } = req.params
        const { dataset } = req.body
        const stringifiedDataset = JSON.stringify(dataset)
        let datasetParams = {
            Bucket: bucketName,
            Key: graphId,
            Body: stringifiedDataset
        }
        //this creates or updates the desired object
        let uploadDatasetPromise = new AWS.S3({ apiVersion: '2006-03-01' })
            .putObject(datasetParams)
            .promise()
        uploadDatasetPromise
            .then(data => {
                res.send(`Succesfully uploaded ${keyName} to ${bucketName}`)
            })
            .catch(next)
    } else {
        res.status(401).send('Please Log In to save your data');
    }
})

//SAVING FOR NOW BECAUSE IT WAS WORKING FOR AWS.S3 CAN DELETE WHEN WE FEEL CONFIDENT IT IS WORKING

// router.get('/send', (req, res, next) => {
//     console.log('getting the object')
//     //this makes the params to search for (or create by)
//     let objectParams = {Bucket: bucketName, Key: keyName};
//     //this makes the promise to do the actual request, get object is a get request
//     let findPromise = new AWS.S3({apiVersion: '2006-03-01'}).getObject(objectParams).promise();
//     findPromise.then(
//         function(res) {
//             console.log(res);
//             //have to parse the Body to get back the file
//             let obj = JSON.stringify(res.Body);
//             console.log('data ', res.Body.toString());
//         }
//     )
//     .catch(next);
// })

// router.post('/send', (req, res, next) => {
//     const {dataset} = req.body;
//     const object = JSON.stringify(dataset);
//     console.log('the body', req.body);
//     console.log('hitting the route')
//     // let bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

//     // bucketPromise.then(
//     //     function(data) {
//             let objectParams = {Bucket: bucketName, Key: keyName, Body: 'object'};
//             //this creates the desired object, with a post request (or is it update??)
//             //actually it seems like it will create or update the filename
//             let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
//             uploadPromise.then(
//                 function(data) {
//                     console.log('data?', data);
//                     console.log('Succesfully uploaded' + bucketName + 'to' + keyName)
//             })
//     // })
//     .catch(next);

//     // axios.get('http://graphify-test.s3.amazonaws.com/test.csv', {
//     //         AWSAccessKeyId: AWS_KEY,
//     //         AWSSecretAccessKey: AWS_SECRET
//     // })
//     // .then(res => console.log(res))
//     // .catch(next);
// })
