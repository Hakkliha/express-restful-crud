"use strict";
// handlers/unauthorized.handler.js

const HttpError = require("./http.handler");

class UnauthorizedError extends HttpError {
    constructor(errors) {
        super("Unauthorized", 401);
        this.errors = errors;
    }
}

module.exports = UnauthorizedError;