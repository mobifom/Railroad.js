const RailroadService = require('../services/railroadService');
const RailroadGraph = require('../models/railroadGraph');

// Define edges of the railroad graph
const routeEdges = [
    ['A', 'D', 5],
    ['A', 'E', 7],
    ['A', 'B', 5],
    ['D', 'E', 8],
    ['D', 'C', 8],
    ['B', 'C', 4],
    ['C', 'E', 2],
    ['C', 'D', 8],
    ['E', 'B', 3]
];
const graph = new RailroadGraph(routeEdges);
const railroadService = new RailroadService(graph);

/**
 * Middleware to attach the RailroadService to the request object.
 * @param {Object} req - The request object.
 * @param {Object} req.railroadService - The RailroadService instance.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const railroadMiddleware = (req, res, next) => {

    req.railroadService = railroadService;
    next();
};

module.exports = railroadMiddleware;