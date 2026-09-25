import { useEffect, useState, useMemo } from 'react';
import './css/General.css';
import { GetCategoriesRequest } from '../API/CategoriesApi.js';
import LoadingComp from "../components/Other/Loading.jsx";
import AddCategoryPopup from "../components/Popups/AddCategoryPopup.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import { 
    FiGrid, 
    FiPlus, 
    FiSearch, 
    FiTrash2, 
    FiImage, 
    FiTag 
} from "react-icons/fi";

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
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
            id,
        });
    };

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await GetCategoriesRequest();
            setCategoriesData(res?.data || []);
        } catch (error) {
            console.error('Kategori verisi alınamadı:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, [refresh]);

    // Arama filtrelemesi
    const filteredCategories = useMemo(() => {
        return categoriesData.filter(item => 
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id?.toString().includes(searchTerm)
        );
    }, [categoriesData, searchTerm]);

    if (loading) return <LoadingComp />;

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
                        <FiGrid size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Kategori Yönetimi
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Toplam {categoriesData.length} kayıtlı kategori bulunmaktadır
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setShowPopup(true)}
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
                    Yeni Kategori Ekle
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
                            placeholder="Kategori ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "90px" }}>ID</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "120px" }}>Kapak</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Kategori Adı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "110px" }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <tr key={category.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                        {/* Kategori ID */}
                                        <td className="px-3 fw-bold text-muted">
                                            #{category.id}
                                        </td>

                                        {/* Kapak Görseli */}
                                        <td className="px-3 py-2">
                                            <div
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    borderRadius: "12px",
                                                    overflow: "hidden",
                                                    border: "1px solid #e2e8f0",
                                                    backgroundColor: "#f8fafc",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                {category.imageUrl ? (
                                                    <img
                                                        src={`https://localhost:7050${category.imageUrl}`}
                                                        alt={category.name}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://placehold.co/100x100?text=Görsel+Yok";
                                                        }}
                                                    />
                                                ) : (
                                                    <FiImage size={22} className="text-muted" />
                                                )}
                                            </div>
                                        </td>

                                        {/* Kategori Adı */}
                                        <td className="px-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <FiTag size={15} className="text-primary" />
                                                <span className="fw-semibold text-dark" style={{ fontSize: "0.92rem" }}>
                                                    {category.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Silme Butonu */}
                                        <td className="px-3 text-end">
                                            <button
                                                type="button"
                                                title="Kategoriyi Sil"
                                                onClick={() =>
                                                    toggleProcess({
                                                        text: `"${category.name}" kategorisini kalıcı olarak silmek istediğinize emin misiniz?`,
                                                        type: "category_delete",
                                                        id: category.id,
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        {searchTerm ? "Arama kriterine uygun kategori bulunamadı." : "Henüz kategori eklenmemiş."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* POPUP BİLEŞENLERİ */}
            {showPopup && (
                <AddCategoryPopup
                    popupCloser={(state) => setShowPopup(state)}
                    reloadPageCat={() => setRefresh(prev => !prev)}
                />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setProcessConfig({ ...processConfig, isOpen: false });
                        setRefresh(prev => !prev);
                    }}
                />
            )}
        </div>
    );
};

export default Categories;
