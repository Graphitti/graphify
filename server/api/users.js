
const router = require('express').Router()
const {User, Graph, YAxis, Dataset} = require('../db/models')
module.exports = router

// CG: unnecessary route
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/dataset/:datasetId', (req, res, next) => {
  if (req.user) {
    const {datasetId} = req.params;
    const userId = req.user.id;
    Dataset.findById(datasetId)
    .then(dataset => {
      if (dataset.userId === userId) {
        const awsId =  dataset.awsId;
        dataset.update({userId : null})
        .then(result => {
          res.status(200).send(awsId)
        })
        .catch(next);
      } else {
        res.status(401).send('You do not have permission to access this data')
      }
    })
  } else {
    res.status(401).send('You must login to effect datasets')
  }
})

router.delete('/graph/:graphId', (req, res, next) => {
  if (req.user) {
    const {graphId} = req.params;
    const userId = req.user.id;
    Graph.findById(graphId)
    .then(graph => {
      if (graph.userId === userId) {
        graph.destroy()
        .then(result => {
          res.status(200).send('Graph deleted')
        })
        .catch(next);
      } else {
        res.status(401).send('You do not have permission to access this data')
      }
    })
  } else {
    res.status(401).send('You must login to effect datasets')
  }
})

router.get('/:userId/graphs', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (req.user && req.user.dataValues.id === userId) {
    Graph.findAll({
      where: {
        userId: userId
      },
      include: [{model: YAxis}]
    })
    .then(graphs => res.json(graphs))
    .cacth(next);
  }
  else {
    res.send('You don\'t have permission to view this data');
  }
})
