"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_model_1 = require("./product.model");
const getProduct_store = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield typeorm_1.getRepository(product_model_1.Products).find();
    return products;
});
const getProductId_store = (ProductId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield typeorm_1.getRepository(product_model_1.Products).findOne(ProductId);
    if (products) {
        return products;
    }
    else {
        throw new Error("Not Product found");
    }
});
const createProduct_store = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = Object.assign(Object.assign({}, data), { created_at: new Date() });
    const newProduct = typeorm_1.getRepository(product_model_1.Products).create(product);
    const results = yield typeorm_1.getRepository(product_model_1.Products).save(newProduct);
    return results;
});
const updateProduct_store = (ProductId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield typeorm_1.getRepository(product_model_1.Products).findOne(ProductId);
    if (product) {
        yield typeorm_1.getRepository(product_model_1.Products).merge(product, data);
        const result = yield typeorm_1.getRepository(product_model_1.Products).save(product);
        return result;
    }
    else {
        throw new Error("Not Product found");
    }
});
const deletetProductId_store = (ProductId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield typeorm_1.getRepository(product_model_1.Products).delete(ProductId);
    return products;
});
exports.default = {
    getProduct_store,
    getProductId_store,
    createProduct_store,
    updateProduct_store,
    deletetProductId_store
};
