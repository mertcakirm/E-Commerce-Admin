import api from "./Api.js";
import {getCookie} from "../components/cookie/Cookie.js";

const token = getCookie("token");

export const GetActiveOrders = async (pageNum)=>{
    return await api.get(`Orders/notCompleted?pageNumber=${pageNum}&pageSize=10`,
        {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
}

export const GetPassiveOrders = async (pageNum)=>{
    return await api.get(`Orders/completed?pageNumber=${pageNum}&pageSize=10`,
        {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
}

export const UpdateOrderStatus = async (orderId, status) => {
    return await api.put(`Orders/${orderId}/status/${status}`)
}

export const CompleteOrderStatus = async (orderId) => {
    return await api.put(`Orders/${orderId}/order/complete`)
}