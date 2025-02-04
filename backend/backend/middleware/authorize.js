/**
 * Middleware to authorize users based on their roles.
 * @param {(string|string[])} [roles=[]] - The roles that are allowed to access the resource. Can be a single role or an array of roles.
 * @returns {function} Middleware function to authorize users.
 */
const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Forbidden. You do not have access to this resource.' });
        }
        next();
    };
};

module.exports = authorize;