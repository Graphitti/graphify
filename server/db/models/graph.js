const Sequelize = require('sequelize')
const db = require('../db')

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
  // datasetUrl: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //     validate: {
  //         isUrl: true
  //     }
  // },
  // shareable: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false
  // },
  title: {
    type: Sequelize.STRING
  },
  xAxisLabel: {
    type: Sequelize.STRING
  },
  yAxisLabel: {
    type: Sequelize.STRING
  },
  graphType: {
    type: Sequelize.STRING
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: '/graph.gif'
  }
})

module.exports = Graph
