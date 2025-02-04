const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const crypto = require('crypto');

const jwtSecretKey = process.env.JWT_SECRET;//crypto.randomBytes(32).toString('hex');

/**
 * Generates a JWT token for the given user.
 * @param {Object} user - The user object.
 * @param {string} user.id - The user's ID.
 * @param {string} user.role - The user's role.
 * @returns {string} The generated JWT token.
 */
const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role 
    };
    return jwt.sign(payload, jwtSecretKey, { expiresIn: '200h' });
};

module.exports = generateToken;

// Example user
const user = { id: '1', username: 'user1', role: 'Public' };
const admin = { id: '2', username: 'admin1', role: 'Admin' };

const tokenUser = generateToken(user);
const tokenAdmin = generateToken(admin);


console.log("JWT Public Token:", tokenUser);
console.log("JWT AdminToken:", tokenAdmin);