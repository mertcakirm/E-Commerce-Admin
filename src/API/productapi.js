import api from "./api.js";

export const fetchProducts = async (pageNum) => {
    const response = await api.get(`product-management/product/all&page=${pageNum}`)
    return response;
};

export const deleteProduct = async (productCode) => {
    return await api.delete(`product-management/delete/${productCode}`);
};

export const updateDiscount = async (discountRate, productCode) => {
    const discountDTO = {discount: discountRate};
    return await api.put(`product-management/update/discount/${productCode}`,JSON.stringify(discountDTO))
};

export const addProduct = async (productDTO) => {
    return await api.post(`product-management/add`, JSON.stringify(productDTO));
};