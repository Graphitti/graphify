const router = require('express').Router()
const {User, Graph, YAxis} = require('../db/models')
module.exports = router

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

router.get('/:userId/graphs', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (req.user && req.user.dataValues.id === userId) {
    Graph.findAll({
      where: {
        userId: userId
      },
      include: [{model: YAxis}]
    })
    .then(graphs => res.json(graphs));
  }
  else {
    res.send('You don\'t have permission to view this data');
  }
})
