const User = require('./user')
const Graph = require('./graph')
const YAxis = require('./yAxis')
const Dataset = require('./dataset')


User.hasMany(Graph);
Graph.belongsTo(User);
User.hasMany(Dataset);
Dataset.belongsTo(User);
Dataset.hasMany(Graph);
Graph.belongsTo(Dataset);
// NL: once you add the YAxis model to the Graph model, remove the associations below
Graph.hasMany(YAxis);
YAxis.belongsTo(Graph);

module.exports = {
  User,
  Graph,
  YAxis,
  Dataset
}
