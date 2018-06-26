const User = require('./user')
const Graph = require('./graph')
const YAxis = require('./yAxis')


User.hasMany(Graph);
Graph.belongsTo(User);
Graph.hasMany(YAxis);
YAxis.belongsTo(Graph);

module.exports = {
  User,
  Graph,
  YAxis
}
