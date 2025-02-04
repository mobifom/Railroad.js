const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { validationResult } = require('express-validator');
const logger = require("../utils/logger");
dotenv.config();

/**
 * Middleware to authenticate JWT tokens.
 * @param {Object} req - The request object.
 * @param {Object} req.header - The headers of the request.
 * @param {string} req.header.Authorization - The Authorization header containing the JWT token.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {undefined}
 * @throws Will return an error response if the token is missing or invalid.
 */
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (ex) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;