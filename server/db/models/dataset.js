const Sequelize = require('sequelize');
const db = require('../db');

const Dataset = db.define('dataset', {
    name: {
        type: Sequelize.STRING
    },
    awsId: {
        type: Sequelize.STRING,
        unique: true,
        get() {
            return () => this.getDataValue('awsId')
        }
    }
})

module.exports = Dataset



/*
user puts in path
the path includes graphId
the graphId is used to find the correct graph (can also check that the user is right)
the graph model will hold a relation to the dataset (datasetId)
using that you can make a call to aws with the dataset-awsId for that info
this will get all info needed for any specific graph

when intially creating a graph we will need to check for a datasets existence
to use the same dataset user will click on it in their user profile
this will load that dataset on the state (making call to it)
we should not load its awsId on the state, because anyone could access it then (though that is difficult)
have some parameter that says it exists (probably add it in redux store)
when user clicks on a graph it will check if that dataset exists
if it does it does nothing for it (maybe it will search for it again for connecting to graph)
if not it creates that awsId and uses that to set in the aws.s3
either way it creates hash for the graph, puts it in database, and sets its connection to the dataset
when it moves to the single component it will again make a call for the dataset and the graph


*/