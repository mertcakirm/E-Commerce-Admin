import axios from "axios";
import {getCookie} from "../components/cookie/cookie.js";

export const BaseUrl = "http://213.142.159.49:8000/api/";

const api = axios.create({
    baseURL: BaseUrl,
});

api.interceptors.request.use((config) => {
    const token = getCookie("SESSIONID");

    if (!config.headers["NoAuth"] && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    delete config.headers["NoAuth"];
    return config;
});

export default api;