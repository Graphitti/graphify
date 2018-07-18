const Sequelize = require('sequelize');
const db = require('../db');

const Dataset = db.define('dataset', {
    name: {
        type: Sequelize.STRING
    },
    awsId: {
        type: Sequelize.STRING,
    }
})

module.exports = Dataset
