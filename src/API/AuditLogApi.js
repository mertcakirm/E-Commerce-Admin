import api from "./Api.js";

export const GetAuditLogsRequest = async (pageNum) => {
    return await api.get(`Auditlog?pageNumber=${pageNum}&pageSize=10`);
}