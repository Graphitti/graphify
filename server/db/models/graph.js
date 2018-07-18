const Sequelize = require('sequelize')
const db = require('../db')


const Graph = db.define('graph', {
  graphId: {
    type: Sequelize.STRING
  },
  xAxis: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  xAxisLabel: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  yAxisLabel: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  graphType: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: 'graph.gif'
  },
  colors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  }
})

module.exports = Graph
