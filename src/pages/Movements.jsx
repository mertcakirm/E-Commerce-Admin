import { useEffect, useState } from "react";
import { GetAuditLogsRequest } from "../API/AuditLogApi.js";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import Pagination from "../components/Other/Pagination.jsx";
import { 
    FiActivity, 
    FiTrash2, 
    FiCalendar, 
    FiHash, 
    FiDatabase, 
    FiFileText, 
    FiInbox 
} from "react-icons/fi";

const Movements = () => {
    const [movements, setMovements] = useState([]);
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const toggleProcess = ({ text, type, id }) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
        });
    };

    const GetMovements = async () => {
        try {
            setLoading(true);
            const response = await GetAuditLogsRequest(page, pageSize);
            if (response?.data?.data?.items) {
                setMovements(response.data.data.items);
                setLastPage(response.data.data.totalPages || 1);
            } else {
                setMovements([]);
            }
        } catch (error) {
            console.error("Audit log verisi alınırken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetMovements();
    }, [page, refresh, pageSize]);

    return (
        <div className="admin-sag-container">
            {/* ÜST BAŞLIK VE AKSİYON ALANI */}
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FiActivity size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Sistem Hareket Kayıtları
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Panel üzerinde gerçekleştirilen kritik eylemler ve denetim izleri
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        toggleProcess({
                            text: "Tüm sistem hareket geçmişini kalıcı olarak sıfırlamak istediğinize emin misiniz?",
                            type: "clear_logs",
                            id: null
                        })
                    }
                    style={{
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fee2e2",
                        padding: "9px 18px",
                        borderRadius: "10px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "#ef4444",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#ef4444";
                        e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fef2f2";
                        e.currentTarget.style.color = "#ef4444";
                    }}
                >
                    <FiTrash2 size={16} />
                    Hareket Geçmişini Sıfırla
                </button>
            </div>

            {/* TABLO KARTI */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                    padding: "1.25rem",
                    overflow: "hidden"
                }}
            >
                <div className="table-responsive p-0 m-0 border-0">
                    <table className="table align-middle m-0 table-hover">
                        <thead style={{ backgroundColor: "#f8fafc" }}>
                            <tr style={{ fontSize: "0.78rem", borderBottom: "1px solid #e2e8f0" }}>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "110px" }}>İşlem ID</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "140px" }}>Hedef Kayıt ID</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">İşlem Detayı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "190px" }}>Tarih</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        Log kayıtları yükleniyor...
                                    </td>
                                </tr>
                            ) : movements && movements.length > 0 ? (
                                movements.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                        {/* Log ID */}
                                        <td className="px-3">
                                            <span 
                                                className="fw-bold"
                                                style={{
                                                    fontFamily: "monospace",
                                                    color: "#64748b",
                                                    backgroundColor: "#f1f5f9",
                                                    padding: "3px 8px",
                                                    borderRadius: "6px",
                                                    fontSize: "0.8rem"
                                                }}
                                            >
                                                #{item.id}
                                            </span>
                                        </td>

                                        {/* Entity ID */}
                                        <td className="px-3">
                                            <div className="d-flex align-items-center gap-1.5 text-secondary">
                                                <FiDatabase size={13} className="text-muted flex-shrink-0" />
                                                <span className="fw-medium text-dark">
                                                    {item.entityId ? `#${item.entityId}` : "-"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* İşlem Detayı */}
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-start gap-2">
                                                <FiFileText size={15} className="text-primary flex-shrink-0 mt-0.5" />
                                                <span 
                                                    className="text-dark" 
                                                    style={{ 
                                                        lineHeight: "1.45",
                                                        wordBreak: "break-word"
                                                    }}
                                                >
                                                    {item.details || "Açıklama belirtilmemiş."}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Tarih */}
                                        <td className="px-3 text-end text-secondary" style={{ whiteSpace: "nowrap" }}>
                                            <div className="d-inline-flex align-items-center gap-1.5">
                                                <FiCalendar size={13} className="text-muted" />
                                                <span style={{ fontSize: "0.82rem" }}>
                                                    {item.createdAt 
                                                        ? new Date(item.createdAt).toLocaleString("tr-TR", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })
                                                        : "-"}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <FiInbox size={32} className="text-muted mb-2" />
                                            <span>Henüz kaydedilmiş bir hareket bulunmuyor.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SAYFALAMA */}
                {movements.length > 0 && (
                    <div className="pt-3 border-top mt-3">
                        <Pagination
                            pageNum={page}
                            setPageNum={setPage}
                            lastPage={lastPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />
                    </div>
                )}
            </div>

            {/* ONAY POPUP */}
            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setProcessConfig(prev => ({ ...prev, isOpen: false }));
                        setRefresh(prev => !prev);
                    }}
                />
            )}
        </div>
    );
};

export default Movements;
