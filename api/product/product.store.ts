import { getRepository } from "typeorm";
import { Products } from "./product.model"

const getProduct_store = async () => {
    const products = await getRepository(Products).find();
    return products;
}

const getProductId_store = async (ProductId: any) => {
    const products = await getRepository(Products).findOne(ProductId);
    if (products) {
        return products;
    } else {
        throw new Error("Not Product found");
    }

}
const createProduct_store = async (data: any) => {
    const product = {
        ...data,
        created_at: new Date()
    }

    const newProduct = getRepository(Products).create(product);
    const results = await getRepository(Products).save(newProduct);
    return results;
}

const updateProduct_store = async (ProductId: any, data: any) => {
    const product = await getRepository(Products).findOne(ProductId);
    if (product) {
        await getRepository(Products).merge(product, data);
        const result = await getRepository(Products).save(product)
        return result;
    } else {
        throw new Error("Not Product found");
    }
}

const deletetProductId_store = async (ProductId: any) => {
    const products = await getRepository(Products).delete(ProductId);
    return products;
}

export default {
    getProduct_store,
    getProductId_store,
    createProduct_store,
    updateProduct_store,
    deletetProductId_store
}