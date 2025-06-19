import api from "./Api.js";

export const GetAllUsersRequest = async (currentPage, usersPerPage) => {
    const response = await api.get(`admin/user/all?page=${currentPage - 1}&size=${usersPerPage}`);
    return response;
};

export const ToggleUserActivityRequest = async (userId) => {
    return await api.put(`admin/user/inactive?userId=${userId}`)
};
