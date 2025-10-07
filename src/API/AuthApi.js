import api from "./Api.js";

export const LoginRequest = async (loginDTO) =>{
    return await api.post("Admin/login", loginDTO);
}

