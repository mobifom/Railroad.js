const rateLimit = require('express-rate-limit');

/**
 * Middleware to limit the number of requests from a single IP address.
 * @type {import('express-rate-limit').RateLimit}
 * @property {number} windowMs - Time window in milliseconds for which the rate limit is applied (15 minutes).
 * @property {number} max - Maximum number of requests allowed within the time window.
 * @property {string} message - Message sent when the rate limit is exceeded.
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 200, 
    message: 'You have reached the maximum # of requests, please try again later.'
});

module.exports = limiter;