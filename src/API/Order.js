import api from "./Api.js";
import {getCookie} from "../components/cookie/Cookie.js";

const token = getCookie("token");

export const GetActiveOrders = async ()=>{
    return await api.get("order/notCompleted",
        {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
}

export const UpdateOrderStatus = async (orderId, status) => {
    return await api.put(`order/${orderId}/status/${status}`)
}

export const CompleteOrderStatus = async (orderId) => {
    return await api.put(`order/${orderId}/order/complete`)
}