import api from "./Api.js";

export const GetProductsRequest = (pageNum, pageSize) => {
    const response = api.get(`products?pageNumber=${pageNum}&pageSize=${pageSize}`);
    return response;
};

export const DeleteProductRequest = async (id) => {
    return await api.delete(`Admin/product/${id}`);
};

export const UpdateDiscountRequest = async (discountRate, productCode) => {
    return await api.put(`Admin/products/${productCode}/discount/${discountRate}`)
};

export const AddProductRequest = async (formData) => {
    return await api.post(`Admin/product`, formData);
};
export const GetProductDetailRequest = async (urlpop) => {
    const response = await api.get(`Products/${urlpop}`)
    return response;
};

export const DeleteProductImageRequest = (id) => {
    return api.delete(`Admin/product/image/${id}`);
};

export const UpdateProductRequest = (urlpop, updatedProduct) => {
    const jsonItem = JSON.stringify(updatedProduct);
    return api.put(`admin/product/update/${urlpop}`, jsonItem);
};