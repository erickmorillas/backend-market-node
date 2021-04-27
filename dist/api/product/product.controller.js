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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_store_1 = __importDefault(require("./product.store"));
const getProduct = () => {
    return product_store_1.default.getProduct_store();
};
const getProductId = (ProductId) => {
    return product_store_1.default.getProductId_store(ProductId);
};
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data) {
        return Promise.reject("Data invalid");
    }
    return product_store_1.default.createProduct_store(data);
});
const updateProduct = (ProductId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data && !ProductId) {
        return Promise.reject("Data invalid");
    }
    return product_store_1.default.updateProduct_store(ProductId, data);
});
const deleteProductId = (ProductId) => {
    return product_store_1.default.deletetProductId_store(ProductId);
};
exports.default = {
    getProduct,
    getProductId,
    createProduct,
    updateProduct,
    deleteProductId
};
