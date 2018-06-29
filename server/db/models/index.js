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
Graph.hasMany(YAxis);
YAxis.belongsTo(Graph);

module.exports = {
  User,
  Graph,
  YAxis,
  Dataset
}
