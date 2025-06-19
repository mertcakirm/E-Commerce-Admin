import api from "./Api.js";

export const LoginRequest = async (loginDTO) =>{
    const response = await api.post("auth/admin/login", JSON.stringify(loginDTO));
    return response;
}