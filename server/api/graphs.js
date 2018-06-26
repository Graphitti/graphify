const router = require('express').Router();
const {Graph, YAxis} = require('../db/models');
module.exports = router;


router.get('/:graphId', (req, res, next) => {
    const graphId = Number(req.params.graphId);
    const userId = req.user ? req.user.dataValues.id : undefined;
    Graph.findById(graphId, {
        include: [{model: YAxis}]
    })
    .then(graph => {
        let shareable = graph.shareable;
        let feedback = 'You don\'t have permission to view this graph';
        if (shareable) {
            feedback = graph;
        }
        if (!shareable) {
            if (graph.userId === userId) {
                feedback = graph;
            }
        }
        res.json(feedback);
    })
})