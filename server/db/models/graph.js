const Sequelize = require('sequelize')
const db = require('../db')

// CG/NL: Maybe add a permissions field that delineates whether a user can edit a graph ('read-only', 'read-write') aka writeAccess: true/false

const Graph = db.define('graph', {
  //save a customized id for each graph
  //do we want colors, width, height anything else customizable
  //will we store all socrata data to aws or will we remake the call everytime
  //space vs complexity/time, aws seems to be unlimited space
  graphId: {
    type: Sequelize.STRING
  },
  xAxis: {
    type: Sequelize.STRING
  },
  // NL: being critical, but probably keep similiar fields next to each other
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
  // NL: Either break out into its own model or do type: Sequelize.ENUM
  graphType: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  // CG: defaultValue --> get rid of '/'
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: '/graph.gif'
  },
  colors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  }
})

module.exports = Graph
