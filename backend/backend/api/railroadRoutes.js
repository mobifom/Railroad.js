const express = require('express');
const { check } = require('express-validator');
const validationMiddleware = require('../middleware/validationMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

/**
 * @typedef {Object} Request
 * @property {Object} body - The body of the request.
 * @property {Array} body.path - The array representing the path to calculate the distance.
 * @property {Object} railroadService - The service used to calculate distances and routes.
 */

/**
 * @typedef {Object} Response
 * @property {function} json - Sends a JSON response.
 */

/**
 * Get distance of a given path.
 * @route POST /distance
 * @group Distance - Operations about distance
 * @param {Array.<string>} path.body.required - Array representing the path to calculate the distance
 * @returns {Object} 200 - An object containing the calculated distance
 * @returns {Error}  default - Unexpected error
 */
router.post('/distance',
     [
        authorize(['Public', 'Admin']),
        check('path').isArray().notEmpty(),
        validationMiddleware
    ],
     /**
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    (req, res) => {
        const path = req.body.path;
        const distance = req.railroadService.getDistance(path);
        res.json({ distance });
    });


/**
 * Get routes with a maximum number of stops.
 * @route POST /routes/max-stops
 * @group Routes - Operations about routes
 * @param {string} start.body.required - Starting point
 * @param {string} end.body.required - Ending point
 * @param {number} maxStops.body.required - Maximum number of stops
 * @returns {Object} 200 - An object containing the routes
 * @returns {Error}  default - Unexpected error
 */
router.post('/routes/max-stops',
    [
        authorize('Admin'),
        check('start').isString().notEmpty(),
        check('end').isString().notEmpty(),
        check('maxStops').isInt({ min: 0 }),
        validationMiddleware
    ],
     /**
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
     (req, res) => {
    const { start, end, maxStops } = req.body;
    const routes = req.railroadService.getRoutesWithMaxStops(start, end, maxStops);
    res.json({ routes });
});

/**
 * Get routes with an exact number of stops.
 * @route POST /routes/exact-stops
 * @group Routes - Operations about routes
 * @param {string} start.body.required - Starting point
 * @param {string} end.body.required - Ending point
 * @param {number} exactStops.body.required - Exact number of stops
 * @returns {Object} 200 - An object containing the routes
 * @returns {Error}  default - Unexpected error
 */
router.post('/routes/exact-stops',
    [
        authorize('Admin'),
        check('start').isString().notEmpty(),
        check('end').isString().notEmpty(),
        check('exactStops').isInt({ min: 0 }),
        validationMiddleware
    ],
    /**
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
     (req, res) => {
    const { start, end, exactStops } = req.body;
    const routes = req.railroadService.getRoutesWithExactStops(start, end, exactStops);
    res.json({ routes });
});

/**
 * Get the shortest route between two locations.
 * @route POST /routes/shortest-route
 * @group Routes - Operations about routes
 * @param {string} start.body.required - Starting point
 * @param {string} end.body.required - Ending point
 * @returns {Object} 200 - An object containing the shortest route
 * @returns {Error}  default - Unexpected error
 */
router.post('/routes/shortest-route',
    [
        authorize('Admin'),
        check('start').isString().notEmpty(),
        check('end').isString().notEmpty(),
        validationMiddleware
    ],
    /**
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
     (req, res) => {
    const { start, end } = req.body;
    const shortestRoute = req.railroadService.getShortestRoute(start, end);
    res.json({ shortestRoute });
});

/**
 * Get all routes with a maximum distance.
 * @route POST /routes/max-distance
 * @group Routes - Operations about routes
 * @param {string} start.body.required - Starting point
 * @param {string} end.body.required - Ending point
 * @param {number} maxDistance.body.required - Maximum distance
 * @returns {Object} 200 - An object containing the routes
 * @returns {Error}  default - Unexpected error
 */
router.post('/routes/max-distance',
    [
        authorize('Admin'),
        check('start').isString().notEmpty(),
        check('end').isString().notEmpty(),
        check('maxDistance').isInt({ min: 1 }),
        validationMiddleware
    ],
    /**
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
     (req, res) => {
    const { start, end, maxDistance } = req.body;
    const routes = req.railroadService.getAllRoutesWithMaxDistance(start, end, maxDistance);
    res.json({ routes });
});

module.exports = router;