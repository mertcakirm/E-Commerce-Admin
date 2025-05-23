import api from "./api.js";

export const fetchCategories = async () => {
        return await api.get(`category/admin/get/all`);

};

export const addCategory = async (categoryDTO) => {
    return await api.post(`category/add`, JSON.stringify(categoryDTO));
};



export const deleteCategory = async (categoryId) => {
    return await api.delete(`admin/category/delete?categoryId=${categoryId}`);

};

export const categoryDropdown = async () => {
    const response = await api.get(`category/get/all`);
    return response;
};
