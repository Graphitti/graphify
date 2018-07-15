const Sequelize = require('sequelize');
const db = require('../db');


const YAxis = db.define('yAxis', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = YAxis