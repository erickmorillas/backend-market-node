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
const user_store_1 = __importDefault(require("./user.store"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = require("../../mailer");
const index_1 = __importDefault(require("../../auth/index"));
const login_controller = (username, param_password) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_store_1.default.getUserbyName_store(username);
    return bcrypt_1.default.compare(param_password, (data === null || data === void 0 ? void 0 : data.password) || '').then((isSame) => {
        if (isSame === true) {
            return {
                message: {
                    message: 'Auth successful',
                    data: {
                        username: data === null || data === void 0 ? void 0 : data.username,
                        firstname: data === null || data === void 0 ? void 0 : data.firstName,
                        lastname: data === null || data === void 0 ? void 0 : data.lastName,
                        email: data === null || data === void 0 ? void 0 : data.email
                    },
                    token: index_1.default.signJWT(data),
                },
                status: 200
            };
        }
        else {
            return {
                message: "Unauthorized",
                status: 401
            };
        }
    });
});
const register_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.username || !data.password || !data.firstName || !data.lastName || !data.email) {
        return Promise.reject("Data invalid");
    }
    const authData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: "",
        password: ""
    };
    // auth params
    authData.username = data.username;
    authData.password = yield bcrypt_1.default.hash(data.password, 5);
    return user_store_1.default.createUser_store(authData);
});
const forgotPassword_controller = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        return Promise.reject("Data invalid");
    }
    const data = yield user_store_1.default.getForgotPassword_store(email);
    if (data) {
        let contentHtml = `
            <h2>Recuperar contraseña:</h2>
            <p>
                Hola ${data.firstName} ${data.lastName} para recuperar tu contraseña, presiona en el siguiente botón:
            </p>

            <a target="_blank" href="http://localhost:4200/changepassword/${data.id}">Recuperar contraseña</a>
            `;
        yield mailer_1.sendmail(data.email, contentHtml);
        return {
            message: 'Email successful',
            status: 200
        };
    }
    else {
        return {
            message: "Email undefined",
            status: 401
        };
    }
});
const changePassword_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.id || !data.password) {
        return Promise.reject("Data invalid");
    }
    const dataUser = yield user_store_1.default.getUserId_store(data.id);
    let contentHtml = `
            <h2>Se cambió la contraseña:</h2>
            <p>
                Hola ${dataUser.firstName} ${dataUser.lastName} acabamos de cambiar la contraseña.:
            </p>
            `;
    yield mailer_1.sendmail(dataUser.email, contentHtml);
    const newPassword = yield bcrypt_1.default.hash(data.password, 5);
    return user_store_1.default.changePassword_store(data.id, newPassword);
});
const getUser_controller = () => {
    return user_store_1.default.getUser_store();
};
const getUserId_controller = (userId) => {
    return user_store_1.default.getUserId_store(userId);
};
const updateUser = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.firstName || !data.lastName || !data.created_at || !userId) {
        return Promise.reject("Data invalid");
    }
    return user_store_1.default.updateUser_store(userId, data);
});
exports.default = {
    getUser_controller,
    getUserId_controller,
    updateUser,
    register_controller,
    login_controller,
    forgotPassword_controller,
    changePassword_controller
};
