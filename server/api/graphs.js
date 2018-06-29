const router = require('express').Router()
const { Graph, YAxis } = require('../db/models')
const axios = require('axios')
const { AWS_KEY, AWS_SECRET } = process.env || require('../../secrets')
const AWS = require('aws-sdk')
// set all the keys and region here
AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: 'us-east-2'
})
const bucketName = 'graphify-test-22'

module.exports = router

router.get('/:graphId', (req, res, next) => {
    const { graphId } = req.params
    Graph.findOne({
        graphId,
        include: [{ model: YAxis }]
    })
        .then(graph => {
            res.send(graph)
        })
        .catch(next);
})

router.post('/:graphId', (req, res, next) => {
    if (req.user) {
        const { graphId } = req.params
        const { xAxis, yAxis, title, graphType } = req.body
        const userId = req.user.id

        let makingGraph = Graph.create({
            userId, graphId, xAxis, title, graphType
        })
        let makingYAxes = Promise.all(
            yAxis.map(name => {
                return YAxis.create({ name })
            })
        )
        return Promise.all([makingGraph, makingYAxes])
            .then(([newGraph, newYAxes]) => {
                newGraph.setYAxes(newYAxes)
                res.send('worked')
            })
            .catch(next);
    } else {
        res.send('You need to be a user to save graph data')
    }
})

router.put('/:graphId', (req, res, next) => {
    if (req.user) {
        const { graphId } = req.params
        const { xAxis, yAxis, xAxisLabel, yAxisLabel, title, graphType } = req.body
        const userId = req.user.id
        //find the graph you need
        Graph.findOne({
            where: {
                graphId
            },
            include: [{ model: YAxis }]
        })
            //update the found graph
            .then(foundGraph => {
                let effectedGraph = foundGraph.update({
                    xAxis, xAxisLabel, yAxisLabel, title, graphType
                });
                //destroy the current yAxes
                foundGraph.yAxes.map(yAxis => {
                    return yAxis.destroy();
                });
                //create new yAxes based off of what was sent
                let newYAxes = Promise.all(yAxis.map(y => {
                    return YAxis.create({ name: y })
                }));
                //return everything in a promise
                return Promise.all([effectedGraph, newYAxes])
            })
            //set the newYAxes as connected to the graph
            .then(([updatedGraph, createdAxes]) => {
                return updatedGraph.setYAxes(createdAxes);
            })
            .then(something => {
                res.send('hello')
            })
            .catch(next);
    } else {
        res.send('You need to be a user to edit this graph')
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
        .catch(next);
})

router.post('/aws/:graphId', (req, res, next) => {
    if (req.user) {
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
                res.send(`Succesfully uploaded ${graphId} to ${bucketName}`)
            })
            .catch(next);
    } else {
        res.status(401).send('Please Log In to save your data')
    }
})