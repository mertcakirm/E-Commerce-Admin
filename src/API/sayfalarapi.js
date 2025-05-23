import {getCookie} from "../components/cookie/cookie.js";
import api from "./api.js";

const BASE_URL = 'http://213.142.159.49:8000/api';
const token = getCookie('SESSIONID');
export const fetchSliderData = async () => {
    const response = await api.get("slider/main/get")
    return response;
};

export const addSlider = async (sliderDTO) => {
    return await api.post(`slider/main/add`, JSON.stringify(sliderDTO))
};

export const deleteSlider = async (id) => {
    return await api.delete(`slider/main/delete?categoryId=${id}`)
};

export const fetchCartData = async () => {
    const response = await api.get(`product/get/cart`);
    return response;
};

export const addCart = async (cartCategoryDTO) => {
    return await api.post(`admin/cart/add`, JSON.stringify(cartCategoryDTO))
};

export const deleteCart = async (id) => {
    return await api.delete(`admin/cart/delete?cartId=${id}`)
};
