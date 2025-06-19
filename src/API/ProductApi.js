import api from "./Api.js";

export const GetProductsRequest = async (pageNum) => {
    const response = await api.get(`product-management/product/all&page=${pageNum}`)
    return response;
};

export const DeleteProductRequest = async (productCode) => {
    return await api.delete(`product-management/delete/${productCode}`);
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
    return api.delete(`image/delete/${id}`);
};

export const UpdateProductRequest = (urlpop, updatedProduct) => {
    const jsonItem = JSON.stringify(updatedProduct);
    return api.put(`admin/product/update/${urlpop}`, jsonItem);
};