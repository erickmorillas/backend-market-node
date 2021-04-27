"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
function success(req, res, message, status) {
    let statusCode = status || 200;
    res.status(statusCode).send({
        error: "",
        status: statusCode,
        body: message
    });
}
exports.success = success;
function error(req, res, message, status, detail) {
    let statusCode = status || 400;
    res.status(statusCode).send({
        error: message,
        status: statusCode,
        body: "",
    });
}
exports.error = error;
