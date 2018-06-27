const router = require('express').Router();
const {Graph, YAxis} = require('../db/models');
const axios = require('axios');
const {AWS_KEY, AWS_SECRET} = require('../../secrets');
const AWS = require('aws-sdk');
const uuid = require('uuid');
// let credentials = new AWS.SharedIniFileCredentials({});
// let credentials = new AWS.Credentials(AWS_KEY, AWS_SECRET)
// AWS.config.credentials = credentials;

// set all the keys and region here
AWS.config.update({accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET, region: 'us-east-2'});
const bucketName = 'graphify-test-22';
const keyName = 'test4.csv';
module.exports = router;

router.get('/send', (req, res, next) => {
    console.log('getting the object')
    //this makes the params to search for (or create by)
    let objectParams = {Bucket: bucketName, Key: keyName};
    //this makes the promise to do the actual request, get object is a get request
    let findPromise = new AWS.S3({apiVersion: '2006-03-01'}).getObject(objectParams).promise();
    findPromise.then(
        function(res) {
            console.log(res);
            //have to parse the Body to get back the file
            let obj = JSON.stringify(res.Body);
            console.log('data ', res.Body.toString());
        }
    )
    .catch(next);
})

router.post('/send', (req, res, next) => {
    const {dataset} = req.body;
    const object = JSON.stringify(dataset);
    console.log('the body', req.body);
    console.log('hitting the route')
    // let bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

    // bucketPromise.then(
    //     function(data) {
            let objectParams = {Bucket: bucketName, Key: keyName, Body: 'object'};
            //this creates the desired object, with a post request (or is it update??)
            //actually it seems like it will create or update the filename
            let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
            uploadPromise.then(
                function(data) {
                    console.log('data?', data);
                    console.log('Succesfully uploaded' + bucketName + 'to' + keyName)
            })
    // })
    .catch(next);

    // axios.get('http://graphify-test.s3.amazonaws.com/test.csv', {
    //         AWSAccessKeyId: AWS_KEY,
    //         AWSSecretAccessKey: AWS_SECRET
    // })
    // .then(res => console.log(res))
    // .catch(next);
})



router.get('/:graphId', (req, res, next) => {
    const graphId = Number(req.params.graphId);
    const userId = req.user ? req.user.dataValues.id : undefined;
    Graph.findById(graphId, {
        include: [{model: YAxis}]
    })
    .then(graph => {
        let shareable = graph.shareable;
        let feedback = 'You don\'t have permission to view this graph';
        if (shareable) {
            feedback = graph;
        }
        if (!shareable) {
            if (graph.userId === userId) {
                feedback = graph;
            }
        }
        res.json(feedback);
    })
    .catch(next);
})

