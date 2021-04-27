"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.jwt.secret;
const signJWT = (data) => {
    return jsonwebtoken_1.default.sign({ id: data.id }, secret, {
        expiresIn: 86400
    });
};
const TokenValidation = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            status: 401,
            message: "Unauthotization",
        });
    }
};
exports.default = {
    signJWT,
    TokenValidation
};
