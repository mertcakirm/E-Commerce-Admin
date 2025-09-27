import api from "./Api.js";

export const GetProductsRequest = (pageNum, pageSize) => {
    const response = api.get(`products?pageNumber=${pageNum}&pageSize=${pageSize}`);
    return response;
};

export const DeleteProductRequest = async (id) => {
    return await api.delete(`Products/${id}`);
};

export const UpdateDiscountRequest = async (discountRate, productCode) => {
    return await api.put(`Admin/products/${productCode}/discount/${discountRate}`)
};

export const AddProductRequest = async (formData) => {
    return await api.post(`Products/add`, formData);
};
export const GetProductDetailRequest = async (urlpop) => {
    return  await api.get(`Products/${urlpop}`)
};

export const AddProductImageRequest = async (productId,formData) => {
    return await api.post(`Products/${productId}/upload-image`, formData);
};


export const AddStockRequest = (productId,size,quantity) => {
    return api.post(`Products/${productId}/stock/${size}/${quantity}`);
};


export const DeleteStockRequest = (variantId) => {
    return api.delete(`Products/stock/${variantId}`);
};


export const DeleteProductImageRequest = (id) => {
    return api.delete(`Products/image/${id}`);
};


export const UpdateProductRequest = (urlpop, updatedProduct) => {
    return api.put(`Products/${urlpop}`, updatedProduct, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};