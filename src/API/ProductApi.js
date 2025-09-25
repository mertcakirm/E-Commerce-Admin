import api from "./Api.js";

export const GetProductsRequest = (pageNum, pageSize) => {
    const response = api.get(`products?pageNumber=${pageNum}&pageSize=${pageSize}`);
    return response;
};

export const DeleteProductRequest = async (id) => {
    return await api.delete(`Admin/product/${id}`);
};

export const UpdateDiscountRequest = async (discountRate, productCode) => {
    const discountDTO = {discount: discountRate};
    return await api.put(`product-management/update/discount/${productCode}`,JSON.stringify(discountDTO))
};

export const AddProductRequest = async (productDTO) => {
    return await api.post(`product-management/add`, JSON.stringify(productDTO));
};

export const GetProductDetailRequest = async (urlpop) => {
    const response = await api.get(`get/${urlpop}`)
    return response;
};

export const DeleteProductImageRequest = (id) => {
    return api.delete(`Admin/product/image/${id}`);
};

export const UpdateProductRequest = (urlpop, updatedProduct) => {
    const jsonItem = JSON.stringify(updatedProduct);
    return api.put(`admin/product/update/${urlpop}`, jsonItem);
};