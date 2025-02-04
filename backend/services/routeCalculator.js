const logger = require('../utils/logger');

/**
 * Class representing a Route Calculator for a graph.
 */
class RouteCalculator {

    /**
     * Creates an instance of RouteCalculator.
     * @param {Object} graph - The graph object which contains the nodes and edges.
     */
    constructor(graph) {
        this.graph = graph;
        logger.info('RouteCalculator initialized');
    }

    /**
     * Gets all routes from start to end with a maximum number of stops.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @param {number} maxStops - The maximum number of stops.
     * @returns {(Array.<Array.<string>>|string)} An array of routes or an error message if an error occurs.
     */
    getRoutesWithMaxStops(start, end, maxStops) {
        try {
            if (!start || !end || typeof maxStops !== 'number' || maxStops < 0) {
                throw new Error('Invalid input parameters');
            }
            logger.info(`Calculating routes from ${start} to ${end} with maximum ${maxStops} stops`);
            const routes = [];
            this.searchRoutesWithMaxStops(start, end, maxStops, 0, [], routes, new Set());
            logger.info(`Found ${routes.length} routes`);;
            return routes;
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Recursive helper function to search for routes with a maximum number of stops.
     * @param {string} currentNode - The current node being visited.
     * @param {string} end - The destination node.
     * @param {number} maxStops - The maximum number of stops.
     * @param {number} stops - The current number of stops.
     * @param {Array.<string>} currentPath - The current path being built.
     * @param {Array.<Array.<string>>} routes - The array to store found routes.
     * @param {Set.<string>} visited - The set of visited nodes.
     */
    searchRoutesWithMaxStops(currentNode, end, maxStops, stops, currentPath, routes, visited) {
        if (stops > maxStops) return;
        if (currentNode === end && stops !== 0) {
            routes.push([...currentPath]);
            logger.info(`Found route ${currentPath}`);
            return;
        }
        if (currentPath.length === 0) {
            currentPath.push(currentNode);
        }
        visited.add(currentNode);
        this.graph.getNeighbors(currentNode).forEach(neighbor => {
            if (!visited.has(neighbor.node)) {
                currentPath.push(neighbor.node);
                this.searchRoutesWithMaxStops(neighbor.node, end, maxStops, stops + 1, currentPath, routes, visited);
                currentPath.pop();
            }
        });
        visited.delete(currentNode);
    }

    /**
     * Gets all routes from start to end with an exact number of stops.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @param {number} exactStops - The exact number of stops.
     * @returns {(Array.<Array.<string>>|string)} An array of routes or an error message if an error occurs.
     */
    getRoutesWithExactStops(start, end, exactStops) {
        try {
            if (!start || !end || typeof exactStops !== 'number' || exactStops < 0) {
                throw new Error('Invalid input parameters');
            }
            logger.info(`Calculating routes from ${start} to ${end} with exactly ${exactStops} stops`);
            const routes = [];
            this.searchRoutesWithExactStops(start, end, exactStops, 0, [], routes, new Set());
            logger.info(`Found ${routes.length}`);
            return routes;
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Recursive helper function to search for routes with an exact number of stops.
     * @param {string} currentNode - The current node being visited.
     * @param {string} end - The destination node.
     * @param {number} exactStops - The exact number of stops.
     * @param {number} stops - The current number of stops.
     * @param {Array.<string>} currentPath - The current path being built.
     * @param {Array.<Array.<string>>} routes - The array to store found routes.
     * @param {Set.<string>} visited - The set of visited nodes.
     */
    searchRoutesWithExactStops(currentNode, end, exactStops, stops, currentPath, routes,visited) {
        if (stops > exactStops) return;
        if (currentNode === end && stops === exactStops) {
            routes.push([...currentPath]);
            logger.info(`Found route ${currentPath}`);
            return;
        } else if (stops > exactStops || currentNode === end) return;
        if (currentPath.length === 0) {
            currentPath.push(currentNode);
        }
        visited.add(currentNode);
        this.graph.getNeighbors(currentNode).forEach(neighbor => {
            if (!visited.has(neighbor.node)) {
                currentPath.push(neighbor.node);
                this.searchRoutesWithExactStops(neighbor.node, end, exactStops, stops + 1, currentPath, routes, visited);
                currentPath.pop();
            }
        });
        visited.delete(currentNode);

    }

    /**
     * Gets all routes from start to end with a maximum distance.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @param {number} maxDistance - The maximum distance.
     * @returns {(Array.<Array.<string>>|string)} An array of routes or an error message if an error occurs.
     */
    getAllRoutesWithMaxDistance(start, end, maxDistance) {
        try {
            if (!start || !end || typeof maxDistance !== 'number' || maxDistance <= 0) {
                throw new Error('Invalid input parameters');
            }
            logger.info(`Calculating all routes from ${start} to ${end} with maximum distance ${maxDistance}`);
            const routes = [];
            this.searchRoutesWithMaxDistance(start, end, 0, maxDistance, [], routes, new Set());
            logger.info(`Found ${routes.length} routes`);
            return routes;
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Recursive helper function to search for routes with a maximum distance.
     * @param {string} currentNode - The current node being visited.
     * @param {string} end - The destination node.
     * @param {number} currentDistance - The current distance of the path.
     * @param {number} maxDistance - The maximum distance allowed.
     * @param {Array.<string>} currentPath - The current path being built.
     * @param {Array.<Array.<string>>} routes - The array to store found routes.
     * @param {Set.<string>} visited - The set of visited nodes.
     */
    searchRoutesWithMaxDistance(currentNode, end, currentDistance, maxDistance, currentPath, routes,visited) {
        if (currentDistance >= maxDistance) return;
        if (currentNode === end && currentDistance !== 0) {
            routes.push([...currentPath]);
            logger.info(`Found route ${currentPath}`);
            return;
        }
        if (currentPath.length === 0) {
            currentPath.push(currentNode);
        }
        visited.add(currentNode);
        this.graph.getNeighbors(currentNode).forEach(neighbor => {
            if (!visited.has(neighbor.node)) {
                currentPath.push(neighbor.node);
                this.searchRoutesWithMaxDistance(neighbor.node, end, currentDistance + neighbor.weight, maxDistance, currentPath, routes,visited);
                currentPath.pop();
            }
        });
        visited.delete(currentNode);

    }
}

module.exports = RouteCalculator;