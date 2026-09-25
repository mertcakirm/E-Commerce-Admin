import { useState } from "react";
import { toast } from "react-toastify";
import {
    DeleteProductRequest,
    DeleteQuestionRequest,
    UpdateDiscountRequest,
} from "../../API/ProductApi.js";
import { DeleteCategoryRequest } from "../../API/CategoriesApi.js";
import { DeleteCartRequest, DeleteSliderRequest } from "../../API/PageContentsApi.js";
import { ToggleUserActivityRequest } from "../../API/UserApi.js";
import { CompleteOrderStatus, DeleteReportRequest, UpdateOrderStatus } from "../../API/Order.js";
import { DeleteOffersRequest, ToggleOffersRequest } from "../../API/OfferApi.js";
import { ClearAuditLogsRequest } from "../../API/AuditLogApi.js";
import { 
    FiTrash2, 
    FiPercent, 
    FiAlertTriangle, 
    FiCheckCircle, 
    FiRefreshCw, 
    FiX 
} from "react-icons/fi";

const ProcessPopup = ({ type, text, id, onClose, discount }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDeleteAction = type?.includes("delete") || type === "clear_logs";
    const isDiscountAction = type === "product_discount";
    const isSuccessAction = type === "finish_order";

    const getIconConfig = () => {
        if (isDeleteAction) {
            return {
                icon: <FiTrash2 size={24} />,
                bgColor: "#fef2f2",
                color: "#ef4444",
                btnBg: "#dc2626",
                btnHover: "#b91c1c",
                btnText: "Evet, Sil"
            };
        }
        if (isDiscountAction) {
            return {
                icon: <FiPercent size={24} />,
                bgColor: "#ecfdf5",
                color: "#059669",
                btnBg: "#059669",
                btnHover: "#047857",
                btnText: "Onayla"
            };
        }
        if (isSuccessAction) {
            return {
                icon: <FiCheckCircle size={24} />,
                bgColor: "#eff6ff",
                color: "#2563eb",
                btnBg: "#2563eb",
                btnHover: "#1d4ed8",
                btnText: "Tamamla"
            };
        }
        return {
            icon: <FiAlertTriangle size={24} />,
            bgColor: "#fffbeb",
            color: "#d97706",
            btnBg: "#2563eb",
            btnHover: "#1d4ed8",
            btnText: "Onayla"
        };
    };

    const config = getIconConfig();

    const handleProcess = async () => {
        setIsSubmitting(true);
        try {
            switch (type) {
                case "product_discount": {
                    const discountRate = parseInt(discount, 10);
                    if (isNaN(discountRate) || discountRate < 0) {
                        toast.error("Geçersiz indirim oranı!");
                        return;
                    }
                    await UpdateDiscountRequest(discountRate, id);
                    toast.success("İndirim başarıyla uygulandı!");
                    break;
                }
                case "product_delete": {
                    await DeleteProductRequest(id);
                    toast.success("Ürün başarıyla silindi!");
                    break;
                }
                case "category_delete": {
                    await DeleteCategoryRequest(id);
                    toast.success("Kategori başarıyla silindi!");
                    break;
                }
                case "toggle_user": {
                    await ToggleUserActivityRequest(id);
                    toast.success("Kullanıcı aktiflik durumu değiştirildi!");
                    break;
                }
                case "update_order": {
                    await UpdateOrderStatus(id, discount);
                    toast.success("Sipariş durumu güncellendi!");
                    break;
                }
                case "finish_order": {
                    await CompleteOrderStatus(id);
                    toast.success("Sipariş tamamlandı!");
                    break;
                }
                case "toggle_offer": {
                    await ToggleOffersRequest(id);
                    toast.success("Kampanya aktiflik durumu güncellendi!");
                    break;
                }
                case "delete_offer": {
                    await DeleteOffersRequest(id);
                    toast.success("Kampanya başarıyla silindi!");
                    break;
                }
                case "delete_slider": {
                    await DeleteSliderRequest(id);
                    toast.success("Slider başarıyla silindi!");
                    break;
                }
                case "delete_cart": {
                    await DeleteCartRequest(id);
                    toast.success("Kart başarıyla silindi!");
                    break;
                }
                case "clear_logs": {
                    await ClearAuditLogsRequest();
                    toast.success("Hareket geçmişi başarıyla silindi!");
                    break;
                }
                case "delete_report": {
                    await DeleteReportRequest(id);
                    toast.success("Rapor başarıyla silindi!");
                    break;
                }
                case "question_delete": {
                    await DeleteQuestionRequest(id);
                    toast.success("Soru başarıyla silindi!");
                    break;
                }
                default:
                    toast.error("Bilinmeyen işlem türü.");
                    return;
            }
        } catch (error) {
            console.error(error);
            toast.error("İşlem gerçekleştirilemedi. Lütfen tekrar deneyin!");
        } finally {
            setIsSubmitting(false);
            onClose(false);
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
                    maxWidth: "420px",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    position: "relative"
                }}
            >
                {/* Kapat Butonu */}
                <button
                    type="button"
                    onClick={() => onClose(false)}
                    disabled={isSubmitting}
                    style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "transparent",
                        border: "none",
                        color: "#94a3b8",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#0f172a";
                        e.currentTarget.style.backgroundColor = "#f1f5f9";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#94a3b8";
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    <FiX size={18} />
                </button>

                {/* İşlem İkonu */}
                <div
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "18px",
                        backgroundColor: config.bgColor,
                        color: config.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.25rem"
                    }}
                >
                    {config.icon}
                </div>

                {/* Başlık ve Açıklama Metni */}
                <h5 className="fw-bold text-dark mb-2" style={{ letterSpacing: "-0.2px" }}>
                    {isDeleteAction ? "İşlemi Onaylayın" : "İşlem Bildirimi"}
                </h5>
                <p className="text-secondary mb-4" style={{ fontSize: "0.92rem", lineHeight: "1.4" }}>
                    {text}
                </p>

                {/* Buton Grubu */}
                <div className="d-flex align-items-center gap-2 w-100">
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            background: "#ffffff",
                            border: "1px solid #cbd5e1",
                            padding: "10px 16px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#475569",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            transition: "background-color 0.15s ease"
                        }}
                        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = "#f8fafc")}
                        onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = "#ffffff")}
                    >
                        Vazgeç
                    </button>
                    <button
                        type="button"
                        onClick={handleProcess}
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            backgroundColor: config.btnBg,
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            boxShadow: `0 4px 14px ${config.bgColor}`,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            transition: "background-color 0.15s ease"
                        }}
                        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = config.btnHover)}
                        onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = config.btnBg)}
                    >
                        {isSubmitting ? (
                            <>
                                <FiRefreshCw className="spinner-border spinner-border-sm" size={14} />
                                İşleniyor...
                            </>
                        ) : (
                            <>
                                <FiCheckCircle size={16} />
                                {config.btnText}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcessPopup;
