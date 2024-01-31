"use strict";
// handlers/forbidden.handler.js

const HttpError = require("./http.handler");

class ForbiddenError extends HttpError {
    constructor(errors) {
        super("Forbidden", 403);
        this.errors = errors;
    }
}

module.exports = ForbiddenError;