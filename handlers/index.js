"use strict";
// handlers/index.js

const HttpError = require("./http.handler");
const NotFoundError = require("./missing.handler");
const UnauthorizedError = require("./unauthorized.handler");
const ValidationError = require("./validation.handler");
const ForbiddenError = require("./forbidden.handler");

module.exports = {
    HttpError,
    NotFoundError,
    UnauthorizedError,
    ValidationError,
    ForbiddenError
}
