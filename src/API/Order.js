import api from "./Api.js";

export const GetActiveOrders = async (pageNum,pageSize)=>{
    return await api.get(`Orders/notCompleted?pageNumber=${pageNum}&pageSize=${pageSize}`);
}

export const GetPassiveOrders = async (pageNum,pageSize)=>{
    return await api.get(`Orders/completed?pageNumber=${pageNum}&pageSize=${pageSize}`);
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

export const GetReportAllRequest = async (pageNum,pageSize) => {
    return await api.get(`Admin/report-get-all?pageNumber=${pageNum}&pageSize=${pageSize}`,)
}

export const GetReportByDates = async (startDate,endDate) => {
    return await api.get(`Admin/monthly-report?startDate=${startDate}&endDate=${endDate}`)
}

export const CreateReportRequest = async (ReportData) => {
    return await api.post(`Admin/create-payment-record`,ReportData)
}

export const DeleteReportRequest = async (recordId) => {
    return await api.delete(`Admin/record/${recordId}`)
}