const router = require('express').Router()
const {Graph, YAxis} = require('../db/models')
const axios = require('axios')
const {AWS_KEY, AWS_SECRET} = require('../../secrets')
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
  const {graphId} = req.params
  Graph.findOne({
    graphId,
    include: [{model: YAxis}]
  })
    .then(graph => {
      res.send(graph)
    })
    .catch(next)
})

router.post('/:graphId', (req, res, next) => {
  if (req.user) {
    const {graphId} = req.params
    const {xAxis, yAxis, title, graphType} = req.body
    const userId = req.user.id

    Graph.create({
      userId,
      graphId,
      xAxis,
      title,
      graphType
    })
      .then(returnedGraph => {
        //this always creates new Yaxis doesn't update this is an issue
        // ---------------------------
        Promise.all(
          yAxis.map(name => {
            return YAxis.create({name})
          })
        ).then(newYAxis => {
          returnedGraph.setYAxes(newYAxis)
          res.send('worked')
        })
      })
      .catch(next)
  } else {
    res.send('You need to be a user to save graph data')
  }
})

router.put('/:graphId', (req, res, next) => {
  if (req.user) {
    const {graphId} = req.params
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

    Graph.findOne({where: {graphId}}).then(foundGraph => {
      let recentGraph
      if (foundGraph) {
        recentGraph = foundGraph.update({
          xAxis,
          xAxisLabel,
          yAxisLabel,
          title,
          graphType,
          shareable
        })
      }
    })
  } else {
    res.send('You need to be a user to edit this graph')
  }
})

router.get('/aws/:graphId', (req, res, next) => {
  //have some kind of security so that we don't do this if the user doesn't have access to the graph
  const {graphId} = req.params
  let datasetParams = {Bucket: bucketName, Key: graphId}
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

router.post('/aws/:graphId', (req, res, next) => {
  if (req.user) {
    const {graphId} = req.params
    const {dataset} = req.body
    const stringifiedDataset = JSON.stringify(dataset)
    let datasetParams = {
      Bucket: bucketName,
      Key: graphId,
      Body: stringifiedDataset
    }
    //this creates or updates the desired object
    let uploadDatasetPromise = new AWS.S3({apiVersion: '2006-03-01'})
      .putObject(datasetParams)
      .promise()
    uploadDatasetPromise
      .then(data => {
        res.send(`Succesfully uploaded ${keyName} to ${bucketName}`)
      })
      .catch(next)
  } else {
    res.status(401).send('Please Log In to save your data')
  }
})