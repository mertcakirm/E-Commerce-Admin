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

export const GetYearlySalesRequest = async () => {
    return await api.get(`Admin/sale/yearly-by-month`)
}

export const GetMonthlyCategorySalesRequest = async () => {
    return await api.get(`Admin/monthly-category-sales`)
}

export const GetGeneralCategorySalesRequest = async () => {
    return await api.get(`Admin/category/general`)
}

export const GetReportAllRequest = async (pageNum) => {
    return await api.get(`Admin/report-get-all?pageNumber=${pageNum}&pageSize=10`,)
}

export const GetReportByDates = async (startDate,endDate) => {
    return await api.get(`Admin/monthly-report?startDate=${startDate}&endDate=${endDate}`)
}

export const CreateReportRequest = async (ReportData) => {
    return await api.post(`Admin/create-payment-record`,ReportData)
}