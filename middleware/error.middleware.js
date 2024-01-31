"use strict";
// middleware/error.middleware.js

const HttpError = require("../handlers/http.handler");

const errorHandler = (err, req, res, next) => {
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        const messages = err.errors.map(err => err.message);
        res.status(415).send({
            status: 'error',
            message: 'Validation failed',
            errors: messages
        });
    } else if (err instanceof HttpError) {
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message,
            ...(err.errors && {errors: err.errors})
        });
    } else {
        console.log(err);
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};

module.exports = errorHandler;