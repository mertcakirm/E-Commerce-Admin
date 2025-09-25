import api from "./Api.js";

export const GetAllUsersRequest = async (pageNum, size) => {
    const response = await api.get(`admin/users/get-all?pageNumber=${pageNum}&pageSize=${size}`);
    return response;
};

export const ToggleUserActivityRequest = async (userId) => {
    return await api.put(`admin/user/inactive?userId=${userId}`)
};
