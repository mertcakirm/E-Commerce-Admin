import axios from "axios";
import {getCookie} from "../components/cookie/Cookie.js";

const api = axios.create({
    baseURL: "https://localhost:7050/api/",
});

api.interceptors.request.use((config) => {
    if (config.method !== "get") {
        const token = getCookie("token");
        if (token) config.headers["Authorization"] = `Bearer ${token.token}`;
    }
    return config;
});

export default api;