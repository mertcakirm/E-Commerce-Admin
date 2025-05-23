import api from "./api.js";

export const Login = async (loginDTO) =>{
    const response = await api.post("auth/admin/login", JSON.stringify(loginDTO));
    return response;
}