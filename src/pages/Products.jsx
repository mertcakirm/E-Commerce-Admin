import { useState, useEffect } from "react";
import { GetProductsRequest } from "../API/ProductApi.js";
import LoadingComp from "../components/Other/Loading.jsx";
import { toast } from "react-toastify";
import Pagination from "../components/Other/Pagination.jsx";
import ProductPopup from "../components/Popups/AddProductPopup.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import DiscountPopup from "../components/Popups/DiscountPopup.jsx";
import { 
    FiBox, 
    FiPlus, 
    FiSearch, 
    FiEdit3, 
    FiPercent, 
    FiMoreVertical, 
    FiTag, 
    FiCheckCircle, 
    FiXCircle, 
    FiImage,
    FiTrendingUp,
    FiLayers
} from "react-icons/fi";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showDiscountPopup, setShowDiscountPopup] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [reloadPage, setReloadPage] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [lastPage, setLastPage] = useState(1);

    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
        extraData: null
    });

    const toggleProcess = ({ text, type, id, extraData }) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
            extraData,
        });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await GetProductsRequest(pageNum, pageSize, debouncedSearch);
            const data = res?.data?.data;
            setLastPage(data?.totalPages || 1);
            setProducts(data?.items || []);
        } catch (err) {
            console.error("Ürün listesi hatası:", err);
            toast.error("Ürünler alınırken bir sorun oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNum(1);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    useEffect(() => {
        fetchData();
    }, [pageNum, debouncedSearch, reloadPage, pageSize]);

    if (loading && products.length === 0) return <LoadingComp />;

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
                        <FiBox size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Ürün Yönetimi
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Katalog ürünlerinizi, stok varyantlarını ve fiyatlandırmaları yönetin
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setUpdateId(null);
                        setShowPopup(true);
                    }}
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
                    Yeni Ürün Ekle
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
                {/* HIZLI ARAMA ALANI */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="position-relative" style={{ maxWidth: "320px", width: "100%" }}>
                        <FiSearch 
                            size={16} 
                            style={{ 
                                position: "absolute", 
                                left: "14px", 
                                top: "50%", 
                                transform: "translateY(-50%)", 
                                color: "#94a3b8" 
                            }} 
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ürün adı veya kod ara..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                borderRadius: "10px",
                                paddingLeft: "38px",
                                fontSize: "0.88rem",
                                border: "1px solid #cbd5e1",
                                boxShadow: "none"
                            }}
                        />
                    </div>
                </div>

                <div className="table-responsive p-0 m-0 border-0">
                    <table className="table align-middle m-0 table-hover">
                        <thead style={{ backgroundColor: "#f8fafc" }}>
                            <tr style={{ fontSize: "0.78rem", borderBottom: "1px solid #e2e8f0" }}>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "240px" }}>Ürün</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "160px" }}>Kategoriler</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "90px" }}>Satış</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "110px" }}>Toplam Stok</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "140px" }}>Fiyat Detayı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "130px" }}>Durum</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "80px" }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5 text-muted">
                                        {searchTerm ? "Arama kriterine uygun ürün bulunamadı." : "Henüz ürün eklenmemiş."}
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => {
                                    const totalStock = product.variants?.reduce((tot, v) => tot + Number(v.stock || 0), 0) || 0;
                                    const hasDiscount = product.discountRate > 0;
                                    const primaryImage = product.images?.[0]?.imageUrl;

                                    return (
                                        <tr key={product.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                            {/* Ürün & ID & Görsel */}
                                            <td className="px-3 py-2">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div
                                                        style={{
                                                            width: "52px",
                                                            height: "52px",
                                                            borderRadius: "10px",
                                                            overflow: "hidden",
                                                            border: "1px solid #e2e8f0",
                                                            backgroundColor: "#f8fafc",
                                                            flexShrink: 0,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        {primaryImage ? (
                                                            <img
                                                                src={`https://localhost:7050${primaryImage}`}
                                                                alt={product.name}
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
                                                    <div className="overflow-hidden">
                                                        <div className="d-flex align-items-center gap-1.5 mb-0.5">
                                                            <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: "0.72rem" }}>
                                                                #{product.id}
                                                            </span>
                                                        </div>
                                                        <span className="fw-bold text-dark text-truncate d-block" style={{ maxWidth: "210px" }} title={product.name}>
                                                            {product.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Kategoriler */}
                                            <td className="px-3">
                                                <div className="d-flex flex-wrap gap-1" style={{ maxWidth: "200px" }}>
                                                    {product.categoryNames && product.categoryNames.length > 0 ? (
                                                        product.categoryNames.map((cName, idx) => (
                                                            <span
                                                                key={idx}
                                                                style={{
                                                                    backgroundColor: "#eff6ff",
                                                                    color: "#1d4ed8",
                                                                    borderRadius: "6px",
                                                                    padding: "2px 8px",
                                                                    fontSize: "0.75rem",
                                                                    fontWeight: 500,
                                                                    border: "1px solid #dbeafe"
                                                                }}
                                                            >
                                                                <FiTag size={10} className="me-1" />
                                                                {cName}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-muted" style={{ fontSize: "0.8rem" }}>-</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Satış Adedi */}
                                            <td className="px-3 text-center">
                                                <span 
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                        fontSize: "0.85rem",
                                                        fontWeight: 600,
                                                        color: "#334155"
                                                    }}
                                                >
                                                    <FiTrendingUp size={13} className="text-muted" />
                                                    {product.saleCount || 0}
                                                </span>
                                            </td>

                                            {/* Toplam Stok */}
                                            <td className="px-3 text-center">
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        backgroundColor: totalStock > 10 ? "#f8fafc" : totalStock > 0 ? "#fffbeb" : "#fef2f2",
                                                        color: totalStock > 10 ? "#334155" : totalStock > 0 ? "#b45309" : "#dc2626",
                                                        border: `1px solid ${totalStock > 10 ? "#e2e8f0" : totalStock > 0 ? "#fde68a" : "#fecaca"}`,
                                                        borderRadius: "8px",
                                                        padding: "3px 10px",
                                                        fontSize: "0.78rem",
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    <FiLayers size={12} />
                                                    {totalStock} Adet
                                                </span>
                                            </td>

                                            {/* Fiyat & İndirim */}
                                            <td className="px-3">
                                                {hasDiscount ? (
                                                    <div>
                                                        <div className="d-flex align-items-center gap-1.5">
                                                            <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                                                                ₺{Number(product.priceWithDiscount || 0).toLocaleString()}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    backgroundColor: "#ecfdf5",
                                                                    color: "#059669",
                                                                    border: "1px solid #a7f3d0",
                                                                    borderRadius: "6px",
                                                                    padding: "1px 5px",
                                                                    fontSize: "0.72rem",
                                                                    fontWeight: 700
                                                                }}
                                                            >
                                                                -%{product.discountRate}
                                                            </span>
                                                        </div>
                                                        <small className="text-muted text-decoration-line-through" style={{ fontSize: "0.78rem" }}>
                                                            ₺{Number(product.price || 0).toLocaleString()}
                                                        </small>
                                                    </div>
                                                ) : (
                                                    <span className="fw-bold text-dark" style={{ fontSize: "0.92rem" }}>
                                                        ₺{Number(product.price || 0).toLocaleString()}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Aktif / Pasif Durum Değiştirme */}
                                            <td className="px-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleProcess({
                                                            text: `"${product.name}" ürününü ${product.isActive ? "pasif" : "aktif"} duruma getirmek istiyor musunuz?`,
                                                            type: "product_delete",
                                                            id: product.id,
                                                        })
                                                    }
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        backgroundColor: product.isActive ? "#ecfdf5" : "#fef2f2",
                                                        color: product.isActive ? "#059669" : "#dc2626",
                                                        border: `1px solid ${product.isActive ? "#a7f3d0" : "#fecaca"}`,
                                                        borderRadius: "999px",
                                                        padding: "4px 12px",
                                                        fontSize: "0.76rem",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        transition: "all 0.15s ease"
                                                    }}
                                                >
                                                    {product.isActive ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
                                                    {product.isActive ? "Aktif" : "Pasif"}
                                                </button>
                                            </td>

                                            {/* Dropdown Aksiyonlar */}
                                            <td className="px-3 text-end">
                                                <div className="dropdown">
                                                    <button
                                                        className="btn p-1"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        style={{
                                                            border: "1px solid #e2e8f0",
                                                            borderRadius: "8px",
                                                            color: "#64748b",
                                                            width: "32px",
                                                            height: "32px",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        <FiMoreVertical size={16} />
                                                    </button>
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-end shadow-sm border p-1"
                                                        style={{ borderRadius: "12px", minWidth: "190px" }}
                                                    >
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 rounded-2 text-dark"
                                                                style={{ fontSize: "0.85rem", fontWeight: 500 }}
                                                                onClick={() => {
                                                                    setUpdateId(product.id);
                                                                    setShowPopup(true);
                                                                }}
                                                            >
                                                                <FiEdit3 size={15} className="text-primary" />
                                                                Ürünü Düzenle
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 rounded-2 text-dark"
                                                                style={{ fontSize: "0.85rem", fontWeight: 500 }}
                                                                onClick={() => {
                                                                    setSelectedProductId(product.id);
                                                                    setShowDiscountPopup(true);
                                                                }}
                                                            >
                                                                <FiPercent size={15} className="text-success" />
                                                                İndirim Tanımla
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SAYFALAMA */}
                <div className="pt-3 border-top mt-3">
                    <Pagination
                        pageNum={pageNum}
                        setPageNum={setPageNum}
                        lastPage={lastPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                </div>
            </div>

            {/* POPUP BİLEŞENLERİ */}
            {showPopup && (
                <ProductPopup
                    popupCloser={(b) => {
                        setShowPopup(b);
                        if (!b) {
                            setUpdateId(null);
                            setReloadPage(prev => !prev);
                        }
                    }}
                    productId={updateId}
                />
            )}

            {showDiscountPopup && (
                <DiscountPopup
                    popupCloser={setShowDiscountPopup}
                    id={selectedProductId}
                    toggleProcess={toggleProcess}
                />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    discount={processConfig.extraData}
                    onClose={() => {
                        setProcessConfig(prev => ({ ...prev, isOpen: false }));
                        setReloadPage(prev => !prev);
                    }}
                />
            )}
        </div>
    );
};

export default Products;
