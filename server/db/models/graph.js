const Sequelize = require('sequelize');
const db = require('../db');

const Graph = db.define('graph', {
    //save a customized id for each graph
    //do we want colors, width, height anything else customizable
    id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    xAxis: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datasetUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    shareable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    title: {
        type: Sequelize.STRING,
    },
    xAxisLabel: {
        type: Sequelize.STRING
    },
    yAxisLabel: {
        type: Sequelize.STRING
    }
})

module.exports = Graph