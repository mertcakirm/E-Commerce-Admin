import api from "./Api.js";

export const GetMessagesRequest = async (page) => {
    return await api.get(`Message/get-all?pageNumber=${page}&pageSize=10`)
}

export const SendMessageAnswerRequest = async (messageId, answer) => {
    return await api.put(`Message/reply/${messageId}`, JSON.stringify(answer), {
        headers: { "Content-Type": "application/json" }
    });
};