const router = require('express').Router()
const {Graph, YAxis, Dataset} = require('../db/models')
const {AWS_KEY, AWS_SECRET, AWS_BUCKET} = process.env || require('../../secrets')
const AWS = require('aws-sdk')
// set all the keys and region here
AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: 'us-east-2'
})
const { getDatasetFromS3, getGraphImgFromS3 } = require('../utils')
const crypto = require('crypto')

module.exports = router

router.get('/:graphId', (req, res, next) => {
  const {graphId} = req.params
  Graph.findOne({
    where: {graphId},
    include: [{model: YAxis}, {model: Dataset}]
  })
    .then(graph => {
      const {awsId} = graph.dataset.dataValues
      const graphDataObj = {}
      getDatasetFromS3(awsId).then(dataset => { // CG: nested Promise
        graphDataObj.dataset = dataset
        graphDataObj.graph = graph
        res.send(graphDataObj)
      })
    })
    .catch(next)
})

<<<<<<< HEAD
// CG: post to /graphs ... put to /graphs/:graphId
router.post('/:graphId', (req, res, next) => {
=======
router.post('/', (req, res, next) => {
>>>>>>> master
  if (req.user) {
    const graphId = crypto
      .randomBytes(8)
      .toString('base64')
      .replace(/\//g, '7')
    const {xAxis, yAxis, title, graphType, datasetName, awsId} = req.body
    const userId = req.user.id

    let makingGraph = Graph.create({ // CG: promiseForGraph
      userId,
      graphId,
      xAxis,
      title,
      graphType
    })
    let makingYAxes = Promise.all( // CG: promiseForYAxis
      yAxis.map(name => {
        return YAxis.create({name})
      })
    )
    let makingDataset = Dataset.findOrCreate({ // OR JUST USE ASYNC AWAIT
      where : {
        name: datasetName,
        userId,
        awsId
      }
    })
    return Promise.all([makingGraph, makingYAxes, makingDataset])
      .then(([newGraph, newYAxes, newDataset]) => {
        let setY = newGraph.setYAxes(newYAxes)
        let setDataset = newGraph.setDataset(newDataset[0])
        return Promise.all([setY, setDataset])
      })
<<<<<<< HEAD
      .then(() => res.send('worked')) // NL: SEND STATUS INSTEAD (201 for created)
=======
      .then(() => res.status(200).send(graphId))
>>>>>>> master
      .catch(next)
  } else {
    res.status(401).send('You need to be a user to save graph data')
  }
})

router.put('/:graphId', (req, res, next) => {
  if (req.user) {
    const {graphId} = req.params
    const {xAxis, yAxis, xAxisLabel, yAxisLabel, title, graphType, colors} = req.body
    const userId = req.user.id
    //find the graph you need
    Graph.findOne({
      where: {
        graphId
      },
      include: [{model: YAxis}]
    })
      //update the found graph
      .then(foundGraph => {
        let effectedGraph = foundGraph.update({
          xAxis, xAxisLabel, yAxisLabel, title, graphType, colors
        })
        //destroy the current yAxes
        foundGraph.yAxes.map(yAxis => {
          return yAxis.destroy()
        })
        //create new yAxes based off of what was sent
        let newYAxes = Promise.all(
          yAxis.map(y => {
            return YAxis.create({name: y})
          })
        )
        //return everything in a promise
        return Promise.all([effectedGraph, newYAxes]) // CG: AFFECTED GRAPH!
      })
      //set the newYAxes as connected to the graph
      .then(([updatedGraph, createdAxes]) => {
        return updatedGraph.setYAxes(createdAxes)
      })
      .then(() => {
<<<<<<< HEAD
        res.send('hello') // NL: SEND SOMETHING ELSE... LIKE STATUS
=======
        res.status(200).send('graph updated')
>>>>>>> master
      })
      .catch(next)
  } else {
    res.status(401).send('You need to be logged in to edit this graph')
  }
})

//////////////////////////////////////////
// CG: DO NOT EXPOSE ROUTES TO AWS      //
// Do this in the loading of the graph  //
// For example in an AWS utils file     //
//////////////////////////////////////////

router.get('/aws/:awsId', (req, res, next) => {
  if (req.user) {
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
      parsedDataset.dataset.awsId = awsId;
      res.json(parsedDataset);
    })
    .catch(next)
  } else {
    res.send(401).send('You must be logged in to access a dataset')
  }
})

router.post('/aws', (req, res, next) => {
  if (req.user) {
    const awsId = crypto
        .randomBytes(8)
        .toString('base64')
        .replace(/\//g, '7')
    const {dataset, columnObj} = req.body
    const stringifiedDataset = JSON.stringify({dataset, columnObj})
    let datasetParams = {
      Bucket: AWS_BUCKET,
      Key: awsId,
      Body: stringifiedDataset
    }

    //this creates or updates the desired object
    let uploadDatasetPromise = new AWS.S3({apiVersion: '2006-03-01'})
      .putObject(datasetParams)
      .promise()
    uploadDatasetPromise
      .then(data => {
        res.status(200).send(awsId)
      })
      .catch(next)
  } else {
    res.status(401).send('Please log in to save your data')
  }
})
