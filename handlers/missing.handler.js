"use strict";
// handlers/missing.handler.js

const HttpError = require("./http.handler");

class NotFoundError extends HttpError {
    constructor(errors) {
        super("The resource could not be found", 404);
        this.errors = errors;
    }
}

module.exports = NotFoundError;