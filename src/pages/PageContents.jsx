import { useState, useEffect } from 'react';
import './css/General.css';
import {
    GetSliderDataRequest,
    GetCartDataRequest
} from '../API/PageContentsApi.js';
import AddCartPopup from "../components/Popups/AddCartPopup.jsx";
import AddSliderContentPopup from "../components/Popups/AddSliderContentPopup.jsx";
import LoadingComp from "../components/Other/Loading.jsx";
import { toast } from "react-toastify";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import { 
    FiSliders, 
    FiGrid, 
    FiPlus, 
    FiTrash2, 
    FiImage, 
    FiLink, 
    FiMaximize2, 
    FiTag 
} from "react-icons/fi";

const PageContents = () => {
    const [cartPopup, setCartPopup] = useState(false);
    const [sliderPopup, setSliderPopup] = useState(false);
    const [sliderData, setSliderData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
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

    const getImageUrl = (url) => {
        if (!url || url === "string") return null;
        if (url.startsWith("http")) return url;
        const cleanPath = url.startsWith("/contents/") ? url : `/contents/${url}`;
        return `https://localhost:7050${cleanPath}`;
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const [slidersRes, cartsRes] = await Promise.all([
                GetSliderDataRequest(),
                GetCartDataRequest()
            ]);
            setSliderData(slidersRes?.data?.data || []);
            setCartData(cartsRes?.data?.data || []);
        } catch (error) {
            console.error("Veriler alınamadı:", error);
            toast.error("İçerikler yüklenirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    if (loading) return <LoadingComp />;

    return (
        <div className="admin-sag-container">
            
            {/* 1. BÖLÜM: SLİDER İÇERİKLERİ */}
            <div className="mb-5">
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
                            <FiSliders size={24} />
                        </div>
                        <div>
                            <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                                Slider Yönetimi
                            </h4>
                            <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                                Ana sayfa üst bölümünde dönen kampanya bannerları
                            </small>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSliderPopup(true)}
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
                        Slider Ekle
                    </button>
                </div>

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
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "160px" }}>Afiş Görseli</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "160px" }}>Üst Başlık</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "180px" }}>Ana Başlık</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "200px" }}>Alt Başlık</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "120px" }}>Hedef Kategori</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "90px" }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sliderData?.length > 0 ? (
                                    sliderData.map((slider) => {
                                        const img = getImageUrl(slider.imageUrl);
                                        return (
                                            <tr key={slider.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                                {/* Afiş Görseli */}
                                                <td className="px-3 py-2">
                                                    <div
                                                        style={{
                                                            width: "140px",
                                                            height: "64px",
                                                            borderRadius: "10px",
                                                            overflow: "hidden",
                                                            border: "1px solid #e2e8f0",
                                                            backgroundColor: "#f8fafc",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        {img ? (
                                                            <img
                                                                src={img}
                                                                alt={slider.name || "Slider"}
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://placehold.co/140x64?text=Görsel+Yok";
                                                                }}
                                                            />
                                                        ) : (
                                                            <FiImage size={24} className="text-muted" />
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Üst Başlık */}
                                                <td className="px-3 text-secondary" style={{ fontSize: "0.82rem" }}>
                                                    {slider.parentName || "-"}
                                                </td>

                                                {/* Ana Başlık */}
                                                <td className="px-3 fw-bold text-dark">
                                                    {slider.name || "-"}
                                                </td>

                                                {/* Alt Başlık */}
                                                <td className="px-3 text-secondary" style={{ fontSize: "0.84rem" }}>
                                                    {slider.subName || "-"}
                                                </td>

                                                {/* Hedef Kategori / Link */}
                                                <td className="px-3">
                                                    <span
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "5px",
                                                            backgroundColor: "#eff6ff",
                                                            color: "#1d4ed8",
                                                            borderRadius: "8px",
                                                            padding: "4px 10px",
                                                            fontSize: "0.78rem",
                                                            fontWeight: 600,
                                                            border: "1px solid #dbeafe"
                                                        }}
                                                    >
                                                        <FiLink size={12} />
                                                        {slider.href ? `#${slider.href}` : "Belirtilmemiş"}
                                                    </span>
                                                </td>

                                                {/* Silme Butonu */}
                                                <td className="px-3 text-end">
                                                    <button
                                                        type="button"
                                                        title="Sliderı Sil"
                                                        onClick={() =>
                                                            toggleProcess({
                                                                text: `"${slider.name || 'Seçili'}" slider kaydını silmek istediğinize emin misiniz?`,
                                                                type: "delete_slider",
                                                                id: slider.id
                                                            })
                                                        }
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
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            Kayıtlı slider içeriği bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 2. BÖLÜM: KATEGORİ KARTLARI */}
            <div>
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
                            <FiGrid size={24} />
                        </div>
                        <div>
                            <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                                Kategori Vitrin Kartları
                            </h4>
                            <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                                Ana sayfa bloklarında yer alan özel ebatlı kategori geçiş kartları
                            </small>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setCartPopup(true)}
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
                        Kategori Kartı Ekle
                    </button>
                </div>

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
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "100px" }}>Görsel</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Kart Adı</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "160px" }}>Hedef Adres</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "130px" }}>Boyut</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "90px" }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData?.length > 0 ? (
                                    cartData.map((cart) => {
                                        const img = getImageUrl(cart.imageUrl);
                                        return (
                                            <tr key={cart.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                                {/* Görsel */}
                                                <td className="px-3 py-2">
                                                    <div
                                                        style={{
                                                            width: "60px",
                                                            height: "60px",
                                                            borderRadius: "10px",
                                                            overflow: "hidden",
                                                            border: "1px solid #e2e8f0",
                                                            backgroundColor: "#f8fafc",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        {img ? (
                                                            <img
                                                                src={img}
                                                                alt={cart.name || "Kart"}
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://placehold.co/60x60?text=Görsel";
                                                                }}
                                                            />
                                                        ) : (
                                                            <FiImage size={20} className="text-muted" />
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Kart Adı */}
                                                <td className="px-3">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <FiTag size={15} className="text-primary flex-shrink-0" />
                                                        <span className="fw-semibold text-dark">
                                                            {cart.name || "-"}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Hedef Adres */}
                                                <td className="px-3 text-secondary">
                                                    <span style={{ fontSize: "0.85rem" }}>
                                                        {cart.href || "-"}
                                                    </span>
                                                </td>

                                                {/* Boyut Rozeti */}
                                                <td className="px-3 text-center">
                                                    <span
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "5px",
                                                            backgroundColor: "#f1f5f9",
                                                            color: "#334155",
                                                            border: "1px solid #e2e8f0",
                                                            borderRadius: "8px",
                                                            padding: "4px 10px",
                                                            fontSize: "0.78rem",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        <FiMaximize2 size={12} className="text-primary" />
                                                        {cart.cartSize || "Standart"}
                                                    </span>
                                                </td>

                                                {/* Silme Butonu */}
                                                <td className="px-3 text-end">
                                                    <button
                                                        type="button"
                                                        title="Kartı Sil"
                                                        onClick={() =>
                                                            toggleProcess({
                                                                text: `"${cart.name || 'Seçili'}" kart içeriğini silmek istediğinize emin misiniz?`,
                                                                type: "delete_cart",
                                                                id: cart.id
                                                            })
                                                        }
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
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            Kayıtlı kategori kartı bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* POPUP MODALLERİ */}
            {sliderPopup && (
                <AddSliderContentPopup
                    popupCloser={(b) => {
                        setSliderPopup(b);
                        if (!b) setRefresh(prev => !prev);
                    }}
                />
            )}

            {cartPopup && (
                <AddCartPopup
                    popupCloser={(b) => {
                        setCartPopup(b);
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
                        setProcessConfig((prev) => ({ ...prev, isOpen: false }));
                        setRefresh(prev => !prev);
                    }}
                />
            )}
        </div>
    );
};

export default PageContents;
