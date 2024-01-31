"use strict";
// handlers/validation.handler.js

const HttpError = require("./http.handler");

class ValidationError extends HttpError {
    constructor(errors) {
        super("Validation failed", 415);
        this.errors = errors;
    }
}

module.exports = ValidationError;