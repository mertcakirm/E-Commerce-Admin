import api from "./Api.js";
import {getCookie} from "../components/cookie/Cookie.js";
const token = getCookie("token");

export const GetAllUsersRequest = async (pageNum, size,search) => {
    return await api.get(
        `User/get-all?pageNumber=${pageNum}&pageSize=${size}&searchTerm=${search}`,
        {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }
    );
};
export const ToggleUserActivityRequest = async (userId) => {
    return await api.put(`User/status/${userId}`)
};
