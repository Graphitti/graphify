const router = require('express').Router();
const {Graph, YAxis, Dataset} = require('../db/models')
const {AWS_KEY, AWS_SECRET, AWS_BUCKET} = process.env || require('../../secrets')
const AWS = require('aws-sdk')
// set all the keys and region here
AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: 'us-east-2'
})

module.exports = router;

router.get('/:awsId', (req, res, next) => {
    //have some kind of security so that we don't do this if the user doesn't have access to the graph
    const {awsId} = req.params
    let datasetParams = {Bucket: AWS_BUCKET, Key: awsId}
    //this makes the promise to do the actual request, get object is a get request
    let findDatasetPromise = new AWS.S3({apiVersion: '2006-03-01'})
    .getObject(datasetParams)
    .promise()
    findDatasetPromise
    .then(result => {
        let parsedDataset = JSON.parse(result.Body)
        parsedDataset.awsId = awsId;
        res.json(parsedDataset)
    })
    .catch(next)
})

router.get('/graph/:graphId', (req, res, next) => {
    //have some kind of security so that we don't do this if the user doesn't have access to the graph
    const {graphId} = req.params
    let datasetParams = {Bucket: AWS_BUCKET, Key: graphId}
    //this makes the promise to do the actual request, get object is a get request
    let findDatasetPromise = new AWS.S3({apiVersion: '2006-03-01'})
    .getObject(datasetParams)
    .promise()
    findDatasetPromise
    .then(result => {
        let parsedDataset = JSON.parse(result.Body)
        res.json(parsedDataset)
    })
    .catch(next)
})

router.post('/graph/:graphId', (req, res, next) => {
    //have some kind of security so that we don't do this if the user doesn't have access to the graph
    const {graphId} = req.params
    const {svgBlob} = req.body
    let datasetParams = {Bucket: AWS_BUCKET, Key: graphId, Body: svgBlob}
    // this makes the promise to do the actual request, get object is a get request
    let uploadBlobPromise = new AWS.S3({apiVersion: '2006-03-01'})
    .putObject(datasetParams)
    .promise()
    uploadBlobPromise
    .then(result => {
        res.status(200).send(graphId);
    })
    .catch(next)
})
