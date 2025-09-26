import api from "./Api.js";
import {getCookie} from "../components/cookie/Cookie.js";
const token = getCookie("token");

export const GetAllUsersRequest = async (pageNum, size) => {
    return await api.get(
        `Admin/users/get-all?pageNumber=${pageNum}&pageSize=${size}`,
        {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }
    );
};
export const ToggleUserActivityRequest = async (userId) => {
    return await api.put(`Admin/users/status/${userId}`)
};
