"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
function success(req, res, message, status) {
    let statusCode = status || 200;
    res.status(statusCode).send({
        error: "",
        status: statusCode,
        boyd: message
    });
}
exports.success = success;
function error(req, res, message, status, detail) {
    console.log(detail);
    res.status(status || 500).send({
        error: message,
        body: "",
    });
}
exports.error = error;
