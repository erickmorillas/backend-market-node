"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../../auth/index"));
const response_1 = require("../../network/response");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.Router();
router.route('/').get(index_1.default.TokenValidation, (req, res) => {
    user_controller_1.default.getUser_controller()
        .then((user) => {
        response_1.success(req, res, user, 200);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, e.sqlMessage, 400, e);
    });
});
router.route('/register').post((req, res) => {
    user_controller_1.default.register_controller(req.body)
        .then((user) => {
        response_1.success(req, res, user, 200);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, e.sqlMessage, 400, e);
    });
});
router.route('/login').post((req, res) => {
    user_controller_1.default.login_controller(req.body.username, req.body.password)
        .then((token) => {
        console.log(token);
        response_1.success(req, res, token.message, token.status);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, "Data invalid", 400, e);
    });
});
router.route('/:userId').get(index_1.default.TokenValidation, (req, res) => {
    user_controller_1.default.getUserId_controller(req.params.userId)
        .then((user) => {
        response_1.success(req, res, user, 200);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, e.sqlMessage, 400, e);
    });
});
router.route('/forgotPassword').post((req, res) => {
    user_controller_1.default.forgotPassword_controller(req.body.email)
        .then((data) => {
        response_1.success(req, res, data.message, data.status);
    })
        .catch((err) => {
        console.log(err);
        response_1.error(req, res, err.message, err.status, err);
    });
});
router.route('/changePassword').post((req, res) => {
    console.log(req.body);
    user_controller_1.default.changePassword_controller(req.body)
        .then((data) => {
        console.log(data);
        response_1.success(req, res, "Was changed successfully", 200);
    })
        .catch((err) => {
        console.log(err);
        response_1.error(req, res, "Could not change the password", 401, err);
    });
});
exports.default = router;
