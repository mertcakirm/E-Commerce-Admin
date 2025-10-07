import api from "./Api.js";

export const GetAuditLogsRequest = async (pageNum) => {
    return await api.get(`Auditlog?pageNumber=${pageNum}&pageSize=10`);
}

export const ClearAuditLogsRequest = async () => {
    return await api.delete(`Auditlog/clear`);
}