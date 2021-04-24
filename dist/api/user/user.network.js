"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = require("../../network/response");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.Router();
/*
router.route('/').get((req: Request, res: Response) => {
    success(req, res, Controller.getUser, 200);
})
*/
router.route('/').get((req, res) => {
    user_controller_1.default.getUser(req, res)
        .then((user) => {
        response_1.success(req, res, user, 200);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, "Internal error", 400, e);
    });
});
exports.default = router;
