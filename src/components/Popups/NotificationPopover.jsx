import React, { forwardRef, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { GetAuditLogsNotSeenRequest, ToggleAuditLogsRequest } from "../../API/AuditLogApi.js";
import LoadingComp from "../Other/Loading.jsx";
import { FiBell, FiCheck, FiClock, FiInbox } from "react-icons/fi";

const NotificationPopover = forwardRef(({ top, left, width = 340 }, ref) => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const innerRef = useRef(null);

    const toggleNotification = async (id) => {
        try {
            await ToggleAuditLogsRequest(id);
            setAuditLogs(prev => prev.filter(log => log.id !== id));
        } catch (error) {
            console.error("Bildirim güncellenemedi:", error);
        }
    };

    const GetLogs = async (page) => {
        try {
            if (page === 1) setLoading(true);
            const response = await GetAuditLogsNotSeenRequest(page);
            const newItems = response?.data?.data?.items || [];

            setAuditLogs(prev => {
                if (page === 1) return newItems;
                const existingIds = new Set(prev.map(item => item.id));
                const filteredNewItems = newItems.filter(item => !existingIds.has(item.id));
                return [...prev, ...filteredNewItems];
            });

            setLastPage(response?.data?.data?.totalPages || 1);
        } catch (error) {
            console.error("Loglar getirilemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const popoverInner = innerRef.current;
        if (!popoverInner) return;

        let isLoading = false;

        const handleScroll = () => {
            if (isLoading) return;
            const { scrollTop, scrollHeight, clientHeight } = popoverInner;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                if (pageNum < lastPage) {
                    isLoading = true;
                    setPageNum(prev => prev + 1);
                    setTimeout(() => {
                        isLoading = false;
                    }, 500);
                }
            }
        };

        popoverInner.addEventListener("scroll", handleScroll);
        return () => popoverInner.removeEventListener("scroll", handleScroll);
    }, [pageNum, lastPage]);

    useEffect(() => {
        GetLogs(pageNum);
    }, [pageNum]);

    return createPortal(
        <div
            ref={ref}
            style={{
                position: "absolute",
                top: `${top - 6}px`,
                left: `${left}px`,
                width: `${width}px`,
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid rgba(226, 232, 240, 0.85)",
                boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.2), 0 8px 16px -6px rgba(0, 0, 0, 0.08)",
                zIndex: 99999,
                overflow: "visible",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* SOL TARAFTAKİ YÖN OKU (Solundaki tetikleyici butonu işaret eder) */}
            <div
                style={{
                    position: "absolute",
                    left: "-7px",
                    top: "20px",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#ffffff",
                    borderLeft: "1px solid rgba(226, 232, 240, 0.85)",
                    borderBottom: "1px solid rgba(226, 232, 240, 0.85)",
                    transform: "rotate(45deg)",
                    zIndex: 1
                }}
            />

            {/* BAŞLIK */}
            <div
                style={{
                    padding: "1rem 1.25rem",
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#ffffff",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    position: "relative",
                    zIndex: 2
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FiBell size={16} />
                    </div>
                    <div>
                        <h6 className="m-0 fw-bold text-dark" style={{ fontSize: "0.92rem" }}>
                            Bildirimler
                        </h6>
                    </div>
                </div>

                {auditLogs.length > 0 && (
                    <span
                        className="badge rounded-pill"
                        style={{
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            border: "1px solid #bfdbfe",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "4px 8px"
                        }}
                    >
                        {auditLogs.length} Yeni
                    </span>
                )}
            </div>

            {/* BİLDİRİM LİSTESİ */}
            <div
                ref={innerRef}
                style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                    padding: "0.5rem 0",
                    position: "relative",
                    zIndex: 2,
                    backgroundColor: "#ffffff",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px"
                }}
            >
                {loading && pageNum === 1 ? (
                    <div className="d-flex justify-content-center py-4">
                        <LoadingComp />
                    </div>
                ) : auditLogs && auditLogs.length > 0 ? (
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {auditLogs.map((log) => (
                            <li
                                key={log.id}
                                style={{
                                    padding: "0.75rem 1.25rem",
                                    borderBottom: "1px solid #f8fafc",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    gap: "10px",
                                    transition: "background-color 0.15s ease",
                                    backgroundColor: "#ffffff"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                            >
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p
                                        className="m-0 text-dark fw-medium"
                                        style={{
                                            fontSize: "0.85rem",
                                            lineHeight: "1.35",
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        {log.details}
                                    </p>
                                    <div
                                        className="d-flex align-items-center gap-1 mt-1 text-muted"
                                        style={{ fontSize: "0.75rem" }}
                                    >
                                        <FiClock size={12} />
                                        <span>
                                            {new Date(log.createdAt).toLocaleString("tr-TR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => toggleNotification(log.id)}
                                    title="Okundu olarak işaretle"
                                    style={{
                                        background: "transparent",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        padding: "6px",
                                        color: "#64748b",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        flexShrink: 0,
                                        transition: "all 0.15s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "#10b981";
                                        e.currentTarget.style.color = "#10b981";
                                        e.currentTarget.style.backgroundColor = "#ecfdf5";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "#e2e8f0";
                                        e.currentTarget.style.color = "#64748b";
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }}
                                >
                                    <FiCheck size={14} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center py-4 text-center px-3">
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#f1f5f9",
                                color: "#94a3b8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "0.5rem"
                            }}
                        >
                            <FiInbox size={20} />
                        </div>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>
                            Yeni bildirim yok
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                            Tüm hareketler okundu olarak işaretlendi.
                        </span>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
});

NotificationPopover.displayName = "NotificationPopover";

NotificationPopover.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number
};

export default NotificationPopover;
