"use strict";

// handler/http.handler.js

class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Operational, trusted error: send message to client
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = HttpError;