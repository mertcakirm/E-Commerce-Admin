import api from "./Api.js";

export const GetAuditLogsRequest = async (pageNum) => {
    return await api.get(`Auditlog?pageNumber=${pageNum}&pageSize=30`);
}

export const GetAuditLogsNotSeenRequest = async (pageNum) => {
    return await api.get(`Auditlog/not-seen-all?pageNumber=${pageNum}&pageSize=10`);
}

export const ClearAuditLogsRequest = async () => {
    return await api.delete(`Auditlog/clear`);
}

export const ToggleAuditLogsRequest = async (id) => {
    return await api.patch(`Auditlog/toggle-see/${id}`);
}