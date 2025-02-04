const RailroadGraph = require("../models/RailroadGraph");
const logger = require("../utils/logger");
const DistanceCalculator = require("./distanceCalculator");
const RouteCalculator = require("./routeCalculator");
const ShortRouteCalculator = require("./shortRouteCalculator");

/**
 * Service class to handle operations related to the railroad network.
 */
class RailroadService {

    /**
    * Creates an instance of RailroadService.
    * @param {RailroadGraph} graph - The graph representing the railroad network.
    */
    constructor(graph) {
        this.distanceCalculator = new DistanceCalculator(graph);
        this.routeCalculator = new RouteCalculator(graph);
        this.shortRouteCalculator = new ShortRouteCalculator(graph);
        logger.info("RailroadService initialized");
    }

    /**
     * Gets the distance of a given path.
     * @param {Array.<string>} path - An array representing the path to calculate the distance for.
     * @returns {(number|string)} The total distance of the path or an error message if the path is invalid.
     */
    getDistance(path) {
        try {
            logger.info(`Getting distance for path: ${path.join(" -> ")}`);
            return this.distanceCalculator.getDistance(path);
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Gets all routes from start to end with a maximum number of stops.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @param {number} maxStops - The maximum number of stops.
     * @returns {(Array.<Object>|string)} An array of routes or an error message if an error occurs.
     */
    getRoutesWithMaxStops(start, end, maxStops) {
        try {
            logger.info(
                `Getting routes from ${start} to ${end} with maximum ${maxStops} stops`
            );
            return this.routeCalculator.getRoutesWithMaxStops(start, end, maxStops);
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Gets all routes from start to end with an exact number of stops.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @param {number} exactStops - The exact number of stops.
     * @returns {(Array.<Object>|string)} An array of routes or an error message if an error occurs.
     */
    getRoutesWithExactStops(start, end, exactStops) {
        try {
            logger.info(
                `Getting routes from ${start} to ${end} with exactly ${exactStops} stops`
            );
            return this.routeCalculator.getRoutesWithExactStops(start,end,exactStops);
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Gets the shortest route from start to end.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @returns {(Object|string)} The shortest route or an error message if an error occurs.
     */
    getShortestRoute(start, end) {
        try {
            logger.info(`Getting shortest route from ${start} to ${end}`);
            return this.shortRouteCalculator.getShortestRoute(start, end);
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }

    /**
     * Gets all routes from start to end with a maximum distance.
     * @param {string} start - The starting node.
     * @param {string} end - The destination node.
     * @param {number} maxDistance - The maximum distance.
     * @returns {(Array.<Object>|string)} An array of routes or an error message if an error occurs.
     */
    getAllRoutesWithMaxDistance(start, end, maxDistance) {
        try {
            logger.info(
                `Getting all routes from ${start} to ${end} with maximum distance ${maxDistance}`
            );
            return this.routeCalculator.getAllRoutesWithMaxDistance(start,end,maxDistance);
        } catch (error) {
            logger.error(error.message);
            return error.message;
        }
    }
}

module.exports = RailroadService;
