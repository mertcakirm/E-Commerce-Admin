import { useState } from "react";
import { CreateReportRequest, GetReportByDates } from "../../API/Order.js";
import { toast } from "react-toastify";
import { 
    FiX, 
    FiBarChart2, 
    FiCalendar, 
    FiSearch, 
    FiCheckCircle, 
    FiDollarSign, 
    FiShoppingBag 
} from "react-icons/fi";

const CreateReportPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
    });
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFetch = async () => {
        if (!formData.startDate || !formData.endDate) {
            toast.warn("Lütfen başlangıç ve bitiş tarihlerini seçiniz!");
            return;
        }

        try {
            setLoading(true);
            const response = await GetReportByDates(formData.startDate, formData.endDate);
            const data = response?.data?.[0] || response?.data;
            if (data) {
                setReportData(data);
                toast.success("Rapor verileri getirildi.");
            } else {
                toast.info("Seçilen tarih aralığında veri bulunamadı.");
            }
        } catch (error) {
            console.error("Rapor alınamadı:", error);
            toast.error("Rapor verisi alınırken bir hata oluştu!");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateReport = async () => {
        if (!reportData) {
            toast.warn("Lütfen önce tarihleri seçip 'Rapor Verilerini Getir' butonuna basınız!");
            return;
        }

        setIsSubmitting(true);
        try {
            await CreateReportRequest(reportData);
            toast.success("Rapor başarıyla kaydedildi!");
            onClose(false);
        } catch (error) {
            console.error("Rapor oluşturma hatası:", error);
            toast.error("Rapor kaydedilemedi!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
                padding: "1rem"
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "540px",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    overflow: "hidden"
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        padding: "1.25rem 2rem",
                        borderBottom: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#ffffff"
                    }}
                >
                    <div className="d-flex align-items-center gap-3">
                        <div
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                backgroundColor: "#eff6ff",
                                color: "#2563eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FiBarChart2 size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                Finansal Rapor Oluştur
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                Tarih aralığına göre satış ve ciro analizi çıkartın.
                            </small>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                            e.currentTarget.style.color = "#0f172a";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#94a3b8";
                        }}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* BODY (SCROLLABLE) */}
                <div style={{ padding: "1.75rem 2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    
                    {/* Tarih Seçim Alanları */}
                    <div className="row g-3">
                        <div className="col-12 col-sm-6">
                            <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.88rem" }}>
                                <FiCalendar size={16} className="text-primary" /> Başlangıç Tarihi <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="form-control"
                                style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none", border: "1px solid #cbd5e1" }}
                            />
                        </div>

                        <div className="col-12 col-sm-6">
                            <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.88rem" }}>
                                <FiCalendar size={16} className="text-primary" /> Bitiş Tarihi <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="form-control"
                                style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none", border: "1px solid #cbd5e1" }}
                            />
                        </div>
                    </div>

                    {/* Veri Getirme Butonu */}
                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                            style={{ borderRadius: "10px", padding: "10px", fontWeight: 600, fontSize: "0.9rem" }}
                            onClick={handleFetch}
                            disabled={loading}
                        >
                            <FiSearch size={16} />
                            {loading ? "Hesaplanıyor..." : "Rapor Verilerini Getir"}
                        </button>
                    </div>

                    {/* Özet Metrik Kutuları */}
                    {reportData && (
                        <div className="row g-3 mt-1">
                            <div className="col-6">
                                <div
                                    style={{
                                        backgroundColor: "#f0fdf4",
                                        border: "1px solid #bbf7d0",
                                        borderRadius: "14px",
                                        padding: "1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px"
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-2 text-success" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                                        <FiDollarSign size={16} /> Toplam Tutar
                                    </div>
                                    <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#166534" }}>
                                        ₺{Number(reportData.totalAmount || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="col-6">
                                <div
                                    style={{
                                        backgroundColor: "#eff6ff",
                                        border: "1px solid #bfdbfe",
                                        borderRadius: "14px",
                                        padding: "1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px"
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-2 text-primary" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                                        <FiShoppingBag size={16} /> Satış Sayısı
                                    </div>
                                    <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1e40af" }}>
                                        {Number(reportData.ordersCount || 0).toLocaleString()} Adet
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div
                    style={{
                        padding: "1.25rem 2rem",
                        borderTop: "1px solid #f1f5f9",
                        backgroundColor: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "12px"
                    }}
                >
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        disabled={isSubmitting}
                        style={{
                            background: "#ffffff",
                            border: "1px solid #cbd5e1",
                            padding: "9px 20px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#475569",
                            cursor: "pointer"
                        }}
                    >
                        Vazgeç
                    </button>
                    <button
                        type="button"
                        onClick={handleCreateReport}
                        disabled={isSubmitting || !reportData}
                        style={{
                            backgroundColor: reportData ? "#2563eb" : "#94a3b8",
                            border: "none",
                            padding: "9px 24px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            boxShadow: reportData ? "0 4px 14px rgba(37, 99, 235, 0.35)" : "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: reportData ? "pointer" : "not-allowed"
                        }}
                    >
                        <FiCheckCircle size={16} />
                        {isSubmitting ? "Oluşturuluyor..." : "Raporu Kaydet"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateReportPopup;
