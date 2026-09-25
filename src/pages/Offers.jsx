import { useEffect, useState } from 'react';
import './css/General.css';
import AddOfferPopUp from "../components/Popups/AddOfferPopUp.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import { GetOffersAllRequest } from "../API/OfferApi.js";
import { 
    FiGift, 
    FiPlus, 
    FiCalendar, 
    FiPercent, 
    FiTrash2, 
    FiRefreshCw, 
    FiCheckCircle, 
    FiXCircle, 
    FiImage,
    FiTag
} from "react-icons/fi";

const Offers = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [proccessState, setProcessState] = useState({
        text: "",
        type: "",
        id: null,
        discount: null
    });

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    const GetOffers = async () => {
        try {
            setLoading(true);
            const response = await GetOffersAllRequest();
            setOffers(response?.data?.data || []);
        } catch (error) {
            console.error("Kampanyalar alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetOffers();
    }, [refresh]);

    const getOfferImageUrl = (url) => {
        if (!url || url === "string") return null;
        if (url.startsWith("http")) return url;
        const cleanPath = url.startsWith("/offers/") ? url : `/offers/${url}`;
        return `https://localhost:7050${cleanPath}`;
    };

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
                        <FiGift size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Kampanya & İndirim Yönetimi
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Aktif ve planlanmış tüm promosyon vitrinlerini yönetin
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={togglePopup}
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
                    Yeni Kampanya Ekle
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
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "90px" }}>ID</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "130px" }}>Banner</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "180px" }}>Kampanya Başlığı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "150px" }}>Başlangıç</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "150px" }}>Bitiş</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "120px" }}>İndirim</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "150px" }}>Durum</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "90px" }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        Kampanyalar yükleniyor...
                                    </td>
                                </tr>
                            ) : offers && offers.length > 0 ? (
                                offers.map((offer) => {
                                    const imageUrl = getOfferImageUrl(offer.imageUrl);
                                    return (
                                        <tr key={offer.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                            {/* ID */}
                                            <td className="px-3 fw-bold text-muted">
                                                #{offer.id}
                                            </td>

                                            {/* Kampanya Banner Görseli */}
                                            <td className="px-3 py-2">
                                                <div
                                                    style={{
                                                        width: "90px",
                                                        height: "50px",
                                                        borderRadius: "8px",
                                                        overflow: "hidden",
                                                        border: "1px solid #e2e8f0",
                                                        backgroundColor: "#f8fafc",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    }}
                                                >
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={offer.name}
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://placehold.co/100x60?text=Görsel+Yok";
                                                            }}
                                                        />
                                                    ) : (
                                                        <FiImage size={20} className="text-muted" />
                                                    )}
                                                </div>
                                            </td>

                                            {/* Kampanya Başlığı */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <FiTag size={15} className="text-primary flex-shrink-0" />
                                                    <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: "220px" }} title={offer.name}>
                                                        {offer.name}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Başlangıç Tarihi */}
                                            <td className="px-3 text-secondary" style={{ whiteSpace: "nowrap" }}>
                                                <div className="d-flex align-items-center gap-1.5">
                                                    <FiCalendar size={13} className="text-muted" />
                                                    <span>{new Date(offer.startDate).toLocaleDateString('tr-TR')}</span>
                                                </div>
                                            </td>

                                            {/* Bitiş Tarihi */}
                                            <td className="px-3 text-secondary" style={{ whiteSpace: "nowrap" }}>
                                                <div className="d-flex align-items-center gap-1.5">
                                                    <FiCalendar size={13} className="text-muted" />
                                                    <span>{new Date(offer.endDate).toLocaleDateString('tr-TR')}</span>
                                                </div>
                                            </td>

                                            {/* İndirim Oranı */}
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
                                                        padding: "4px 8px",
                                                        fontSize: "0.82rem",
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    <FiPercent size={12} />
                                                    {offer.discountRate || 0}
                                                </span>
                                            </td>

                                            {/* Aktiflik Durumu & Değiştirme Butonu */}
                                            <td className="px-3 text-center">
                                                <div className="d-inline-flex align-items-center gap-2">
                                                    <span
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "5px",
                                                            backgroundColor: offer.isActive ? "#ecfdf5" : "#fef2f2",
                                                            color: offer.isActive ? "#059669" : "#dc2626",
                                                            border: `1px solid ${offer.isActive ? "#a7f3d0" : "#fecaca"}`,
                                                            borderRadius: "999px",
                                                            padding: "3px 10px",
                                                            fontSize: "0.75rem",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {offer.isActive ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
                                                        {offer.isActive ? "Aktif" : "Pasif"}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        title="Durumu Değiştir"
                                                        onClick={() => {
                                                            setProcessState({
                                                                text: `"${offer.name}" kampanyasının durumunu ${offer.isActive ? "Pasif" : "Aktif"} yapmak istiyor musunuz?`,
                                                                type: "toggle_offer",
                                                                id: offer.id,
                                                                discount: null
                                                            });
                                                            setProcessIsPopupOpen(true);
                                                        }}
                                                        style={{
                                                            backgroundColor: "#f8fafc",
                                                            border: "1px solid #e2e8f0",
                                                            color: "#64748b",
                                                            borderRadius: "8px",
                                                            width: "28px",
                                                            height: "28px",
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
                                                        <FiRefreshCw size={12} />
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Silme Butonu */}
                                            <td className="px-3 text-end">
                                                <button
                                                    type="button"
                                                    title="Kampanyayı Sil"
                                                    onClick={() => {
                                                        setProcessState({
                                                            text: `"${offer.name}" kampanyasını kalıcı olarak silmek istediğinize emin misiniz?`,
                                                            type: "delete_offer",
                                                            id: offer.id,
                                                            discount: null
                                                        });
                                                        setProcessIsPopupOpen(true);
                                                    }}
                                                    style={{
                                                        backgroundColor: "#fef2f2",
                                                        border: "1px solid #fee2e2",
                                                        color: "#ef4444",
                                                        borderRadius: "8px",
                                                        width: "36px",
                                                        height: "36px",
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
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <FiGift size={32} className="text-muted mb-2" />
                                            <span>Kayıtlı kampanya bulunmamaktadır.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* POPUP BİLEŞENLERİ */}
            {isPopupOpen && (
                <AddOfferPopUp
                    popupCloser={(b) => {
                        setIsPopupOpen(b);
                        if (!b) setRefresh(prev => !prev);
                    }}
                />
            )}

            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        setProcessIsPopupOpen(b);
                        if (!b) setRefresh(prev => !prev);
                    }}
                    text={proccessState.text}
                    type={proccessState.type}
                    id={proccessState.id}
                    discount={proccessState.discount}
                />
            )}
        </div>
    );
};

export default Offers;
