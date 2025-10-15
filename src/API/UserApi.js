import api from "./Api.js";

export const GetAllUsersRequest = async (pageNum, size,search) => {
    return await api.get(
        `User/get-all?pageNumber=${pageNum}&pageSize=${size}&searchTerm=${search}`
    );
};

export const ToggleUserActivityRequest = async (userId) => {
    return await api.put(`User/status/${userId}`)
};
