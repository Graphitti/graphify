const router = require('express').Router()
const {User, Graph, Dataset} = require('../db/models')
const axios = require('axios')
const {AWS_KEY, AWS_SECRET, AWS_BUCKET} = process.env || require('../../secrets')
const AWS = require('aws-sdk')
// set all the keys and region here
AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: 'us-east-2'
})
module.exports = router

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    },
    include: [{model: Graph}, {model: Dataset}]
  })
  if (!user) {
    console.log('No such user found:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else if (!user.correctPassword(req.body.password)) {
    console.log('Incorrect password for user:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else {
    req.login(user, err => (err ? next(err) : res.json(user)))
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
