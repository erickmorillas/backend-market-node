import store from "./user.store";
import bcrypt from "bcrypt"

import { sendmail } from '../../mailer';

import auth from "../../auth/index"

const login_controller = async (username: any, param_password: any) => {
    const data = await store.getUserbyName_store(username);

    return bcrypt.compare(param_password, data?.password || '').then((isSame) => {

        if (isSame === true) {
            return {
                message: {
                    message: 'Auth successful',
                    data: {
                        username: data?.username,
                        firstname: data?.firstName,
                        lastname: data?.lastName,
                        email: data?.email
                    },
                    token: auth.signJWT(data),
                },
                status: 200
            };
        } else {
            return {
                message: "Unauthorized",
                status: 401
            }
        }
    });
}

const register_controller = async (data: any) => {

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
    authData.password = await bcrypt.hash(data.password, 5);

    return store.createUser_store(authData);
}

const forgotPassword_controller = async (email: string) => {

    if (!email) {
        return Promise.reject("Data invalid");
    }

    const data = await store.getForgotPassword_store(email);

    if (data) {

        let contentHtml = `
            <h2>Recuperar contraseña:</h2>
            <p>
                Hola ${data.firstName} ${data.lastName} para recuperar tu contraseña, presiona en el siguiente botón:
            </p>

            <a target="_blank" href="http://localhost:4200/changepassword/${data.id}">Recuperar contraseña</a>
            `
        await sendmail(data.email, contentHtml)

        return {
            message: 'Email successful',
            status: 200
        }
    } else {
        return {
            message: "Email undefined",
            status: 401
        }
    }
}

const changePassword_controller = async (data: any) => {
    if (!data.id || !data.password) {
        return Promise.reject("Data invalid");
    }

    const dataUser = await store.getUserId_store(data.id)

    let contentHtml = `
            <h2>Se cambió la contraseña:</h2>
            <p>
                Hola ${dataUser.firstName} ${dataUser.lastName} acabamos de cambiar la contraseña.:
            </p>
            `
    await sendmail(dataUser.email, contentHtml)

    const newPassword = await bcrypt.hash(data.password, 5);

    return store.changePassword_store(data.id, newPassword);
}

const getUser_controller = () => {
    return store.getUser_store();
}

const getUserId_controller = (userId: any) => {
    return store.getUserId_store(userId);
}

const updateUser = async (userId: any, data: any) => {
    if (!data.firstName || !data.lastName || !data.created_at || !userId) {
        return Promise.reject("Data invalid");
    }
    return store.updateUser_store(userId, data);
}

export default {
    getUser_controller,
    getUserId_controller,
    updateUser,
    register_controller,
    login_controller,
    forgotPassword_controller,
    changePassword_controller
}