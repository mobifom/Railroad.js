const logger = require('../utils/logger');

/**
 * Represents a graph structure specifically for a railroad network.
 */
class RailroadGraph {

    /**
     * Creates an instance of RailroadGraph.
     * @param {Array.<Array.<(string|number)>>} edges - The edges of the graph, where each edge is represented as [source, destination, weight].
     * @throws {TypeError} If edges is not an array.
     */
    constructor(edges) {
        if (!Array.isArray(edges)) {
            throw new TypeError('Edges must be an array');
        }

        this.adjacencyList = new Map();
        edges.forEach(([source, destination, weight]) => {
            this.addEdge(source, destination, weight);
        });
        logger.info('RailroadGraph initialized');
    }

   /**
     * Adds an edge to the graph.
     * @param {string} source - The source node of the edge.
     * @param {string} destination - The destination node of the edge.
     * @param {number} weight - The weight of the edge.
     * @throws {Error} If the weight is not a positive number.
     */
    addEdge(source, destination, weight) {
        if (typeof weight !== 'number' || weight <= 0) {
            throw new Error(`Invalid weight: ${weight}. Weight must be a positive number.`);
        }
        if (!this.adjacencyList.has(source)) {
            this.adjacencyList.set(source, []);
        }
        this.adjacencyList.get(source).push({ node: destination, weight });
        logger.info(`Edge added from ${source} to ${destination} with weight ${weight}`);

    }

    /**
     * Gets the neighbors of a given node.
     * @param {string} node - The node to get neighbors for.
     * @returns {Array.<Object>} The neighbors of the node, where each neighbor is represented as { node: string, weight: number }.
     */
    getNeighbors(node) {
        return this.adjacencyList.get(node) || [];
    }
}

module.exports = RailroadGraph;