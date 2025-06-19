import api from "./Api.js";

export const GetCategoriesRequest = async () => {
        return await api.get(`category/admin/get/all`);

};

export const addCategoryRequest = async (categoryDTO) => {
    return await api.post(`category/add`, JSON.stringify(categoryDTO));
};



export const deleteCategoryRequest = async (categoryId) => {
    return await api.delete(`admin/category/delete?categoryId=${categoryId}`);

};

export const categoryDropdownRequest = async () => {
    const response = await api.get(`category/get/all`);
    return response;
};
