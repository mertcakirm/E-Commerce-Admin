import api from "./Api.js";

export const GetSliderDataRequest = async () => {
    const response = await api.get("SliderCart/sliders")
    return response;
};

export const AddSliderRequest = async (formData) => {
    console.log(formData)
    return await api.post(`SliderCart/sliders` ,formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
};

export const DeleteSliderRequest = async (id) => {
    return await api.delete(`SliderCart/sliders/${id}`)
};

export const GetCartDataRequest = async () => {
    const response = await api.get(`SliderCart/carts`);
    return response;
};

export const AddCartRequest = async (formData) => {
    return await api.post(`SliderCart/carts`,formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
};

export const DeleteCartRequest = async (id) => {
    return await api.delete(`SliderCart/carts/${id}`)
};
