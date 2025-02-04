const logger = require("../utils/logger");

/**
 * Class representing a Distance Calculator for a graph.
 */
class DistanceCalculator {

    /**
     * Creates an instance of DistanceCalculator.
     * @param {Object} graph - The graph object which contains the nodes and edges.
     */
    constructor(graph) {
        this.graph = graph;
        logger.info("DistanceCalculator initialized");
    }

    /**
     * Calculates the total distance of a given path.
     * @param {Array.<string>} path - An array representing the path to calculate the distance for.
     * @returns {(number|string)} The total distance of the path or an error message if the path is invalid.
     */
    getDistance(path) {
        try {
            if (!Array.isArray(path) || path.length === 0) {
                throw new Error("Invalid path: Path should not be empty array");
            }
            logger.info(`Calculating distance for path: ${path.join(" -> ")}`);
            let totalDistance = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const distance = this.getEdgeDistance(path[i], path[i + 1]);
                if (distance === null) return "NO SUCH ROUTE";
                totalDistance += distance;
            }
            logger.info(`Total distance: ${totalDistance}`);
            return totalDistance;
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Gets the distance between two nodes.
     * @param {string} from - The starting node.
     * @param {string} to - The destination node.
     * @returns {(number|null)} The distance between the nodes or null if no such edge exists.
     */
    getEdgeDistance(from, to) {
        const neighbors = this.graph.getNeighbors(from);
        const edge = neighbors.find((neighbor) => neighbor.node === to);
        const distance = edge ? edge.weight : null;
        logger.info(`Edge distance from ${from} to ${to}: ${distance}`);
        return distance;
    }
}

module.exports = DistanceCalculator;
