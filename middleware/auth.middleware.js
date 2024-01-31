"use strict";
// middleware/auth.middleware.js

const jwt = require("jsonwebtoken");
const {UnauthorizedError, ForbiddenError} = require("../handlers");

const authenticateToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];

        // Check if bearer is undefined
        if (typeof bearerHeader !== "undefined") {
            // Split at the space to separate "Bearer" from the "<token>"
            const bearerToken = bearerHeader.split(" ")[1];

            // Verify the token
            jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
                if (err) {
                    // If token is not valid or expired
                    throw new ForbiddenError(["You are forbidden to access this resource"]);
                } else {
                    // Token is valid
                    req.user = authData;
                    next();
                }
            });
        } else {
            throw new UnauthorizedError(["You are not authorized to access this resource"]);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateToken;
