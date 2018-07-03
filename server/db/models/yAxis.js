const Sequelize = require('sequelize');
const db = require('../db');

// CG: add to graph model
const YAxis = db.define('yAxis', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = YAxis