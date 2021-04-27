"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../../auth/index"));
const response_1 = require("../../network/response");
const product_controller_1 = __importDefault(require("./product.controller"));
const router = express_1.Router();
router.route('/').get(index_1.default.TokenValidation, (req, res) => {
    product_controller_1.default.getProduct()
        .then((product) => {
        response_1.success(req, res, product, 200);
    })
        .catch((e) => {
        response_1.error(req, res, e.sqlMessage, 400, e);
    });
});
router.route('/:productId').get(index_1.default.TokenValidation, (req, res) => {
    product_controller_1.default.getProductId(req.params.productId)
        .then((product) => {
        response_1.success(req, res, product, 200);
    })
        .catch((e) => {
        response_1.error(req, res, "Not Product found", 404, e);
    });
});
router.route('/').post(index_1.default.TokenValidation, (req, res) => {
    product_controller_1.default.createProduct(req.body)
        .then((product) => {
        response_1.success(req, res, product, 200);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, e.sqlMessage, 400, e);
    });
});
router.route('/:productId').put(index_1.default.TokenValidation, (req, res) => {
    product_controller_1.default.updateProduct(req.params.productId, req.body)
        .then((product) => {
        response_1.success(req, res, product, 200);
    })
        .catch((e) => {
        console.log(e);
        if (e.sqlMessage) {
            response_1.error(req, res, e.sqlMessage, 400, e);
        }
        else {
            response_1.error(req, res, "Not Product Id found", 404, e);
        }
    });
});
router.route('/:productId').delete(index_1.default.TokenValidation, (req, res) => {
    product_controller_1.default.deleteProductId(req.params.productId)
        .then((product) => {
        response_1.success(req, res, product, 200);
    })
        .catch((e) => {
        console.log(e);
        response_1.error(req, res, e.sqlMessage, 400, e);
    });
});
exports.default = router;
