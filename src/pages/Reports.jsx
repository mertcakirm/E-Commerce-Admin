import { useEffect, useState } from 'react';
import './css/General.css';
import Pagination from "../components/Other/Pagination.jsx";
import { GetReportAllRequest } from "../API/Order.js";
import CreateReportPopup from "../components/Popups/CreateReportPopup.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import { 
    FiBarChart2, 
    FiPlus, 
    FiCalendar, 
    FiPrinter, 
    FiTrash2, 
    FiCreditCard, 
    FiSend, 
    FiShoppingBag,
    FiFileText
} from "react-icons/fi";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [pageSize, setPageSize] = useState(10);
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
            id
        });
    };

    const getReports = async () => {
        try {
            setLoading(true);
            const response = await GetReportAllRequest(pageNum, pageSize);
            setReports(response?.data?.items || []);
            setLastPage(response?.data?.totalPages || 1);
        } catch (error) {
            console.error("Raporlar yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReports();
    }, [pageNum, refresh, pageSize]);

    return (
        <div className="admin-sag-container">
            {/* ÜST BAŞLIK VE AKSİYON BAR */}
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
                        <FiBarChart2 size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Finansal & Satış Raporları
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Dönemsel satış hacmi, ödeme yöntemleri ve toplam ciro analizleri
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setPopupOpen(true)}
                    style={{
                        backgroundColor: "#2563eb",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                        transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                >
                    <FiPlus size={18} />
                    Yeni Rapor Oluştur
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
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "160px" }}>Oluşturulma Tarihi</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "180px" }}>Kapsanan Tarih Aralığı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "120px" }}>Satış Adedi</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ minWidth: "130px" }}>Havale / EFT</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ minWidth: "130px" }}>Kredi Kartı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ minWidth: "140px" }}>Toplam Ciro</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "80px" }}>Yazdır</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "80px" }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        Raporlar yükleniyor...
                                    </td>
                                </tr>
                            ) : reports.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <FiFileText size={32} className="text-muted mb-2" />
                                            <span>Kayıtlı finansal rapor bulunmuyor.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                reports.map((report) => (
                                    <tr key={report.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                        {/* Rapor Oluşturulma Tarihi */}
                                        <td className="px-3 text-secondary" style={{ whiteSpace: "nowrap" }}>
                                            <div className="d-flex align-items-center gap-1.5">
                                                <FiCalendar size={13} className="text-muted" />
                                                <span>
                                                    {new Date(report.createdAt).toLocaleString("tr-TR", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Kapsanan Tarih Aralığı */}
                                        <td className="px-3">
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    backgroundColor: "#f8fafc",
                                                    border: "1px solid #e2e8f0",
                                                    borderRadius: "8px",
                                                    padding: "3px 10px",
                                                    fontSize: "0.78rem",
                                                    color: "#334155",
                                                    fontWeight: 500
                                                }}
                                            >
                                                {new Date(report.startDate).toLocaleDateString("tr-TR")} &rarr; {new Date(report.endDate).toLocaleDateString("tr-TR")}
                                            </span>
                                        </td>

                                        {/* Satış Sayısı */}
                                        <td className="px-3 text-center">
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    backgroundColor: "#eff6ff",
                                                    color: "#1d4ed8",
                                                    border: "1px solid #dbeafe",
                                                    borderRadius: "8px",
                                                    padding: "3px 9px",
                                                    fontSize: "0.78rem",
                                                    fontWeight: 600
                                                }}
                                            >
                                                <FiShoppingBag size={12} />
                                                {report.ordersCount || 0} Adet
                                            </span>
                                        </td>

                                        {/* Havale / EFT */}
                                        <td className="px-3 text-end text-secondary">
                                            <div className="d-flex align-items-center justify-content-end gap-1">
                                                <FiSend size={12} className="text-muted" />
                                                <span>₺{Number(report.transferTotal || 0).toLocaleString()}</span>
                                            </div>
                                        </td>

                                        {/* Kredi Kartı */}
                                        <td className="px-3 text-end text-secondary">
                                            <div className="d-flex align-items-center justify-content-end gap-1">
                                                <FiCreditCard size={12} className="text-muted" />
                                                <span>₺{Number(report.creditCartTotal || 0).toLocaleString()}</span>
                                            </div>
                                        </td>

                                        {/* Toplam Tutar */}
                                        <td className="px-3 text-end fw-bold text-dark" style={{ whiteSpace: "nowrap", fontSize: "0.92rem" }}>
                                            ₺{Number(report.totalAmount || 0).toLocaleString()}
                                        </td>

                                        {/* Yazdır Butonu */}
                                        <td className="px-3 text-center">
                                            <button
                                                type="button"
                                                title="Yazdır / İndir"
                                                style={{
                                                    backgroundColor: "#f8fafc",
                                                    border: "1px solid #e2e8f0",
                                                    color: "#64748b",
                                                    borderRadius: "8px",
                                                    width: "34px",
                                                    height: "34px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.15s ease"
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#eff6ff";
                                                    e.currentTarget.style.color = "#2563eb";
                                                    e.currentTarget.style.borderColor = "#bfdbfe";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#f8fafc";
                                                    e.currentTarget.style.color = "#64748b";
                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                }}
                                            >
                                                <FiPrinter size={16} />
                                            </button>
                                        </td>

                                        {/* Silme Butonu */}
                                        <td className="px-3 text-end">
                                            <button
                                                type="button"
                                                title="Raporu Sil"
                                                onClick={() =>
                                                    toggleProcess({
                                                        text: `#${report.id} numaralı finansal rapor kaydını silmek istediğinize emin misiniz?`,
                                                        type: "delete_report",
                                                        id: report.id
                                                    })
                                                }
                                                style={{
                                                    backgroundColor: "#fef2f2",
                                                    border: "1px solid #fee2e2",
                                                    color: "#ef4444",
                                                    borderRadius: "8px",
                                                    width: "34px",
                                                    height: "34px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
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
                                                <FiTrash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SAYFALAMA */}
                {reports.length > 0 && (
                    <div className="pt-3 border-top mt-3">
                        <Pagination 
                            pageNum={pageNum} 
                            setPageNum={setPageNum} 
                            lastPage={lastPage} 
                            pageSize={pageSize} 
                            setPageSize={setPageSize} 
                        />
                    </div>
                )}
            </div>

            {/* POPUP BİLEŞENLERİ */}
            {popupOpen && (
                <CreateReportPopup 
                    onClose={(b) => {
                        setPopupOpen(b);
                        if (!b) setRefresh(prev => !prev);
                    }} 
                />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setRefresh(prev => !prev);
                        setProcessConfig((prev) => ({ ...prev, isOpen: false }));
                    }}
                />
            )}
        </div>
    );
};

export default Reports;
