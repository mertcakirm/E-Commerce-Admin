import { useEffect, useState } from 'react';
import { AddCartRequest } from "../../API/PageContentsApi.js";
import { toast } from "react-toastify";
import { GetCategoriesRequest } from "../../API/CategoriesApi.js";
import { 
    FiX, 
    FiGrid, 
    FiTag, 
    FiMaximize2, 
    FiUploadCloud, 
    FiTrash2, 
    FiCheckCircle 
} from "react-icons/fi";

const AddCartPopup = ({ popupCloser }) => {
    const [categories, setCategories] = useState([]);
    const [cartData, setCartData] = useState({
        cartName: "",
        cartCategory: "",
        cartSize: "",
        cartImage: null
    });

    const [dragging, setDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCategory = async () => {
        try {
            const res = await GetCategoriesRequest();
            setCategories(res?.data || []);
        } catch (err) {
            console.error("Kategori verisi alınamadı:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCartData(prev => ({ ...prev, [name]: value }));
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith("image/")) {
            setCartData(prev => ({ ...prev, cartImage: file }));
        } else {
            toast.warn("Lütfen geçerli bir görsel formatı seçin (PNG, JPG, WEBP).");
        }
    };

    const handleCartFileChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    const handleCartSubmit = async () => {
        if (!cartData.cartName.trim()) {
            toast.warn("Lütfen kart adını girin.");
            return;
        }

        if (!cartData.cartCategory) {
            toast.warn("Lütfen bir kategori seçin.");
            return;
        }

        if (!cartData.cartSize) {
            toast.warn("Lütfen kart boyutunu seçin.");
            return;
        }

        if (!cartData.cartImage) {
            toast.warn("Lütfen bir kart görseli yükleyin!");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("Name", cartData.cartName.trim());
        formData.append("CartSize", cartData.cartSize);
        formData.append("Href", cartData.cartCategory);
        formData.append("Image", cartData.cartImage);

        try {
            await AddCartRequest(formData);
            toast.success("Kategori kartı başarıyla oluşturuldu!");
            popupCloser(false);
            setCartData({
                cartName: "",
                cartCategory: "",
                cartSize: "",
                cartImage: null
            });
        } catch (error) {
            console.error("Request error: ", error);
            toast.error("Kart oluşturulamadı, lütfen tekrar deneyin!");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

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
                    maxWidth: "580px",
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
                            <FiGrid size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                Kategori Kartı Ekle
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                Ana sayfa için vitrin kartı oluşturun.
                            </small>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => popupCloser(false)}
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
                    
                    {/* Kart Adı */}
                    <div>
                        <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.88rem" }}>
                            <FiTag size={16} className="text-primary" /> Kart Adı <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="cartName"
                            className="form-control"
                            placeholder="Örn: Yeni Sezon Trendleri"
                            style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none", border: "1px solid #cbd5e1" }}
                            value={cartData.cartName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Kategori ve Boyut Seçimi */}
                    <div className="row g-3">
                        <div className="col-12 col-sm-6">
                            <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.88rem" }}>
                                <FiTag size={16} className="text-primary" /> Kategori <span className="text-danger">*</span>
                            </label>
                            <select
                                name="cartCategory"
                                className="form-select"
                                style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none", border: "1px solid #cbd5e1" }}
                                value={cartData.cartCategory}
                                onChange={handleInputChange}
                            >
                                <option value="">Kategori Seçin</option>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Kategori bulunamadı</option>
                                )}
                            </select>
                        </div>

                        <div className="col-12 col-sm-6">
                            <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.88rem" }}>
                                <FiMaximize2 size={16} className="text-primary" /> Boyut <span className="text-danger">*</span>
                            </label>
                            <select
                                name="cartSize"
                                className="form-select"
                                style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none", border: "1px solid #cbd5e1" }}
                                value={cartData.cartSize}
                                onChange={handleInputChange}
                            >
                                <option value="">Boyut Seçin</option>
                                <option value="Tam">Tam Genişlik (Full)</option>
                                <option value="Yarım">Yarım Genişlik (1/2)</option>
                                <option value="1/3">Üçte Bir (1/3)</option>
                            </select>
                        </div>
                    </div>

                    {/* Görsel Yükleme Dropzone */}
                    <div>
                        <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.88rem" }}>
                            <FiUploadCloud size={16} className="text-primary" /> Kart Görseli <span className="text-danger">*</span>
                        </label>

                        {!cartData.cartImage ? (
                            <label
                                style={{
                                    border: dragging ? "2px dashed #2563eb" : "2px dashed #cbd5e1",
                                    borderRadius: "14px",
                                    padding: "1.75rem 1.5rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    backgroundColor: dragging ? "#eff6ff" : "#f8fafc",
                                    transition: "all 0.2s",
                                    width: "100%",
                                    margin: 0
                                }}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onMouseEnter={e => {
                                    if (!dragging) e.currentTarget.style.borderColor = "#3b82f6";
                                }}
                                onMouseLeave={e => {
                                    if (!dragging) e.currentTarget.style.borderColor = "#cbd5e1";
                                }}
                            >
                                <div
                                    style={{
                                        width: "46px",
                                        height: "46px",
                                        borderRadius: "50%",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#2563eb",
                                        marginBottom: "0.5rem"
                                    }}
                                >
                                    <FiUploadCloud size={22} />
                                </div>
                                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#334155" }}>
                                    Kart görselini buraya sürükleyin veya seçin
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "3px" }}>
                                    PNG, JPG veya WEBP formatı önerilir
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={handleCartFileChange}
                                />
                            </label>
                        ) : (
                            <div
                                style={{
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "14px",
                                    padding: "0.85rem 1.2rem",
                                    backgroundColor: "#f8fafc",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "1rem"
                                }}
                            >
                                <div className="d-flex align-items-center gap-3 overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(cartData.cartImage)}
                                        alt="Kart Önizleme"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "10px",
                                            objectFit: "cover",
                                            border: "1px solid #cbd5e1"
                                        }}
                                    />
                                    <div className="overflow-hidden">
                                        <p className="m-0 fw-semibold text-dark text-truncate" style={{ fontSize: "0.88rem" }}>
                                            {cartData.cartImage.name}
                                        </p>
                                        <small className="text-secondary" style={{ fontSize: "0.75rem" }}>
                                            {(cartData.cartImage.size / 1024).toFixed(1)} KB
                                        </small>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCartData(prev => ({ ...prev, cartImage: null }))}
                                    style={{
                                        backgroundColor: "#fef2f2",
                                        border: "1px solid #fee2e2",
                                        color: "#ef4444",
                                        borderRadius: "10px",
                                        padding: "8px 12px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "0.8rem",
                                        fontWeight: 600,
                                        flexShrink: 0
                                    }}
                                >
                                    <FiTrash2 size={14} /> Kaldır
                                </button>
                            </div>
                        )}
                    </div>
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
                        onClick={() => popupCloser(false)}
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
                        onClick={handleCartSubmit}
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: "#2563eb",
                            border: "none",
                            padding: "9px 24px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer"
                        }}
                    >
                        <FiCheckCircle size={16} />
                        {isSubmitting ? "Kaydediliyor..." : "Kartı Kaydet"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCartPopup;
