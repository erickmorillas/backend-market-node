import { getRepository } from "typeorm";
import { User } from "./user.model"

const getUser_store = async () => {
    const users = await getRepository(User).find();
    return users;
}

const getUserId_store = async (userId: any) => {
    const users = await getRepository(User).findOne(userId);
    return users;
}

const getUserbyName_store = async (username: any) => {
    const users = await getRepository(User).findOne({ username: username });
    return users;
}

const createUser_store = async (data: any) => {

    const user = {
        ...data,
        created_at: new Date()
    }

    const newUser = getRepository(User).create(user);
    const results = await getRepository(User).save(newUser);
    return results;
}

const updateUser_store = async (userId: any, data: any) => {
    const user = await getRepository(User).findOne(userId);
    if (user) {
        await getRepository(User).merge(user, data);
        const result = await getRepository(User).save(user)
        return result;
    } else {
        throw new Error("Not user found");
    }
}

const getForgotPassword_store = async (email: string) => {
    const user = await getRepository(User).findOne({ email: email });
    return user;
}

const changePassword_store = async (id: any, password: any) => {
    const user = await getRepository(User).findOne({ id: id });

    if (user) {
        await getRepository(User).merge(user, { password: password });
        const result = await getRepository(User).save(user)
        return result;
    } else {
        throw new Error("Not user found");
        //return "Not user found";
    }
}

export default {
    getUser_store,
    getUserId_store,
    createUser_store,
    updateUser_store,
    getUserbyName_store,
    getForgotPassword_store,
    changePassword_store
}