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
const user_model_1 = require("./user.model");
const getUser_store = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield typeorm_1.getRepository(user_model_1.User).find();
    return users;
});
const getUserId_store = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield typeorm_1.getRepository(user_model_1.User).findOne(userId);
    return users;
});
const getUserbyName_store = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield typeorm_1.getRepository(user_model_1.User).findOne({ username: username });
    return users;
});
const createUser_store = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = Object.assign(Object.assign({}, data), { created_at: new Date() });
    const newUser = typeorm_1.getRepository(user_model_1.User).create(user);
    const results = yield typeorm_1.getRepository(user_model_1.User).save(newUser);
    return results;
});
const updateUser_store = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(user_model_1.User).findOne(userId);
    if (user) {
        yield typeorm_1.getRepository(user_model_1.User).merge(user, data);
        const result = yield typeorm_1.getRepository(user_model_1.User).save(user);
        return result;
    }
    else {
        throw new Error("Not user found");
    }
});
const getForgotPassword_store = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(user_model_1.User).findOne({ email: email });
    return user;
});
const changePassword_store = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(user_model_1.User).findOne({ id: id });
    if (user) {
        yield typeorm_1.getRepository(user_model_1.User).merge(user, { password: password });
        const result = yield typeorm_1.getRepository(user_model_1.User).save(user);
        return result;
    }
    else {
        throw new Error("Not user found");
        //return "Not user found";
    }
});
exports.default = {
    getUser_store,
    getUserId_store,
    createUser_store,
    updateUser_store,
    getUserbyName_store,
    getForgotPassword_store,
    changePassword_store
};
