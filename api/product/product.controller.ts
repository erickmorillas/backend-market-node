import store from "./product.store";

const getProduct = () => {
    return store.getProduct_store();
}

const getProductId = (ProductId: any) => {
    return store.getProductId_store(ProductId);
}

const createProduct = async (data: any) => {
    if (!data) {
        return Promise.reject("Data invalid");
    }
    return store.createProduct_store(data);
}

const updateProduct = async (ProductId: any, data: any) => {
    if (!data && !ProductId) {
        return Promise.reject("Data invalid");
    }
    return store.updateProduct_store(ProductId, data);
}

const deleteProductId = (ProductId: any) => {
    return store.deletetProductId_store(ProductId);
}

export default {
    getProduct,
    getProductId,
    createProduct,
    updateProduct,
    deleteProductId
}