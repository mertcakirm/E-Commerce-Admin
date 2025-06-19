import api from "./Api.js";

export const GetSliderDataRequest = async () => {
    const response = await api.get("slider/main/get")
    return response;
};

export const AddSliderRequest = async (sliderDTO) => {
    return await api.post(`slider/main/add`, JSON.stringify(sliderDTO))
};

export const DeleteSliderRequest = async (id) => {
    return await api.delete(`slider/main/delete?categoryId=${id}`)
};

export const GetCartDataRequest = async () => {
    const response = await api.get(`product/get/cart`);
    return response;
};

export const AddCartRequest = async (cartCategoryDTO) => {
    return await api.post(`admin/cart/add`, JSON.stringify(cartCategoryDTO))
};

export const DeleteCartRequest = async (id) => {
    return await api.delete(`admin/cart/delete?cartId=${id}`)
};
