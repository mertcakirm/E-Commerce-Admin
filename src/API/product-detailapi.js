import api from "./api.js";

export const fetchProductDetail = async (urlpop) => {
    const response = await api.get(`get/${urlpop}`)
    return response;
};

export const deleteProductImage = (id) => {
    return api.delete(`image/delete/${id}`);
};

export const updateProduct = (urlpop, updatedProduct) => {
    const jsonItem = JSON.stringify(updatedProduct);
    return api.put(`admin/product/update/${urlpop}`, jsonItem);
};