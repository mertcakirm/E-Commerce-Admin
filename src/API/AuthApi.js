import api from "./Api.js";

export const LoginRequest = async (loginDTO) =>{
    const response = await api.post("auth/login", loginDTO);
    return response;
}