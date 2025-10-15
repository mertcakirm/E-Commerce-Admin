import api from "./Api.js";

export const GetCategoriesRequest = async () => {
    return await api.get(`category`);
};

export const AddCategoryRequest = async (categoryDTO) => {
    return await api.post(`category/category`, categoryDTO);
};

export const DeleteCategoryRequest = async (categoryId) => {
    return await api.delete(`category/category/${categoryId}`);
};

export const GetCategoryDropdownRequest = async () => {
    return await api.get(`category/get/all`);
};
