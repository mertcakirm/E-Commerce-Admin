import api from "./api.js";

export const getAllUsers = async (currentPage, usersPerPage) => {
    const response = await api.get(`admin/user/all?page=${currentPage - 1}&size=${usersPerPage}`);
    return response;
};

export const toggleUserActivity = async (userId) => {
    return await api.put(`admin/user/inactive?userId=${userId}`)
};
