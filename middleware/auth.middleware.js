// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const authenticateToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space to separate "Bearer" from the "<token>"
        const bearerToken = bearerHeader.split(' ')[1];

        // Verify the token
        jwt.verify(bearerToken, config.JWT_SECRET, (err, authData) => {
            if (err) {
                // If token is not valid or expired
                return res.status(403).json({ message: 'Forbidden' });
            } else {
                // Token is valid
                req.user = authData;
                next();
            }
        });
    } else {
        // Forbidden if no token
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateToken;
