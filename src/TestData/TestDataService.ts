import AxiosCommon from "../network/AxiosCommon";

let defaultURL = 'http://localhost:5273';
interface Product {
    id: number;
    name: string;
    price: number;
}

const productApi = {
    getAllProduct: "/api/product/getAll",
    getDetailProduct: '/api/product/getDetail/',
    createProduct: '/api/product/createProduct',
    updateProduct: '/api/product/updateProduct/',
    deleteProduct: '/api/product/deleteProduct/',
}

export async function getAllProduct() {
    return await AxiosCommon.getAsync<Product[]>(defaultURL + productApi.getAllProduct, null);
}

export async function getDetailProduct(id: number) {
    return await AxiosCommon.getAsync<Product>(defaultURL + productApi.getDetailProduct + id, null);
}

export async function createProduct(params: any) {
    return await AxiosCommon.postAsync(defaultURL + productApi.createProduct, params);
}

export async function updateProduct(id: number, params: Product) {
    return await AxiosCommon.postAsync(defaultURL + productApi.updateProduct + id, params);
}

export async function deleteProduct(id: number) {
    return await AxiosCommon.postAsync(defaultURL + productApi.deleteProduct + id, null);
}