import api from "./Api.js";

export const GetCategoriesRequest = async () => {
        return await api.get(`category`);

};

export const AddCategoryRequest = async (categoryDTO) => {
    return await api.post(`category/add`, JSON.stringify(categoryDTO));
};



export const DeleteCategoryRequest = async (categoryId) => {
    return await api.delete(`admin/category/delete?categoryId=${categoryId}`);

};

export const GetCategoryDropdownRequest = async () => {
    const response = await api.get(`category/get/all`);
    return response;
};
