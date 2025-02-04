const { validationResult } = require('express-validator');

/**
 * Middleware to validate the request using express-validator.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {Object} req.params - The route parameters of the request.
 * @param {Object} req.query - The query parameters of the request.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 * @throws Will return a 400 status with error details if validation fails.
 */
const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = validationMiddleware;