const router = require('express').Router();
const { Graph, YAxis, Dataset } = require('../db/models')
const { AWS_KEY, AWS_SECRET, AWS_BUCKET } = require('../../secrets')
const AWS = require('aws-sdk')
const crypto = require('crypto')
// set all the keys and region here
AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: 'us-east-2'
})

module.exports = router;

router.post('/', (req, res, next) => {
    if (req.user) {
        let ready = false;
        let awsId = 'cat';
        // let awsId = crypto
        //     .randomBytes(8)
        //     .toString('base64')
        //     .replace(/\//g, '7');
        console.log('awsId', awsId);
        const createAWSId = new Promise()
        while (ready === false) {
            Dataset.findOne({ where: { awsId } })
            .then(dataset => {
                console.log('found dataset',dataset)
                if (!dataset) ready = true;
                else {
                awsId = crypto
                .randomBytes(8)
                .toString('base64')
                .replace(/\//g, '7');
                }
            })
            return awsId
        }
            .then(awsId => {

        console.log('awsId', awsId)

        const { dataset, columnObj } = req.body;
        const stringifiedDataset = JSON.stringify({ dataset, columnObj });
        let datasetParams = {
            Bucket: AWS_BUCKET,
            Key: awsId,
            Body: stringifiedDataset
        }
        //this creates or updates the desired object
        let uploadDatasetPromise = new AWS.S3({ apiVersion: '2006-03-01' })
            .putObject(datasetParams)
            .promise();
        uploadDatasetPromise
            .then(data => {
                res.status(200).send(awsId);
            })
        })
            .catch(next);
    } else {
        res.status(401).send('Please Log In to save your data');
    }
});

router.get('/:awsId', (req, res, next) => {
    //have some kind of security so that we don't do this if the user doesn't have access to the graph
    const { awsId } = req.params;
    const userId = req.user.id;
    const datasetParams = { Bucket: AWS_BUCKET, Key: awsId };
    //this makes the promise to do the actual request, get object is a get request
    Dataset.findOne({
        where: {
            awsId
        }
    })
    .then(dataset => {
        if (!dataset) {
            res.staus(400).send('This dataset does not exist');
        } else {
            let findDatasetPromise = new AWS.S3({ apiVersion: '2006-03-01' })
                .getObject(datasetParams)
                .promise();
            findDatasetPromise
                .then(result => {
                    let parsedDataset = JSON.parse(result.Body);
                    parsedDataset.dataset.awsId = awsId;
                    res.status(200).json(parsedDataset);
                })
        }
    })
    .catch(next)
});
