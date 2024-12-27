import {getCookie} from "../../components/cookie/cookie.js";

const BASE_URL = 'http://213.142.159.49:8000/api';
const token =getCookie('SESSIONID');
export const fetchSliderData = async () => {
  const response = await fetch(`${BASE_URL}/slider/main/get`);
  if (!response.ok) throw new Error('Failed to fetch slider data');
  return await response.json();
};

export const addSlider = async (sliderDTO) => {
  const response = await fetch(`${BASE_URL}/slider/main/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sliderDTO),
  });
  if (!response.ok) throw new Error('Failed to add slider');
  window.setTimeout(() => window.location.reload(), 1000);
  return await response.json();
};

export const deleteSlider = async (id) => {
  const response = await fetch(`${BASE_URL}/slider/main/delete?categoryId=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to delete slider');
  setTimeout(window.location.reload(),1000)
};

export const fetchCartData = async () => {
  const response = await fetch(`${BASE_URL}/product/get/cart`);
  if (!response.ok) throw new Error('Failed to fetch cart data');
  return await response.json();
};

export const addCart = async (cartCategoryDTO) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/cart/add`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartCategoryDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add cart');
        }

        return response; // Başarılı olduğunda yanıtı döndür
    } catch (error) {
        console.error("Request error: ", error);
        throw error; // Hata fırlat
    }
};

export const deleteCart = async (id) => {
  const response = await fetch(`${BASE_URL}/admin/cart/delete?cartId=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to delete cart');
  window.setTimeout(() => window.location.reload(), 1000);

};
