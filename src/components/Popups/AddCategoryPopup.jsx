import { useEffect, useState } from "react";
import { AddCategoryRequest, GetCategoriesRequest } from "../../API/CategoriesApi.js";
import { toast } from "react-toastify";
import { 
    FiX, 
    FiTag, 
    FiUploadCloud, 
    FiTrash2, 
    FiCheckCircle, 
    FiFolderPlus 
} from "react-icons/fi";

const AddCategoryPopup = ({ popupCloser, reloadPageCat }) => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getDropdown();
    }, []);

    const getDropdown = async () => {
        try {
            const categoriesObj = await GetCategoriesRequest();
            setCategories(categoriesObj?.data || []);
        } catch (err) {
            console.error("Kategori çekilemedi:", err);
        }
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith("image/")) {
            setNewCategoryImage(file);
        } else {
            toast.warn("Lütfen geçerli bir görsel formatı seçin (PNG, JPG, WEBP).");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleSubmit = async () => {
        if (!newCategoryName.trim()) {
            toast.error("Kategori adı boş olamaz!");
            return;
        }

        if (!newCategoryImage) {
            toast.error("Lütfen bir görsel seçin.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("Name", newCategoryName.trim());
        formData.append("Image", newCategoryImage);

        try {
            await AddCategoryRequest(formData);
            toast.success("Kategori başarıyla eklendi!");
            popupCloser(false);
            if (reloadPageCat) reloadPageCat(true);
        } catch (error) {
            console.error("Kategori ekleme hatası:", error);
            toast.error("Kategori eklenemedi, lütfen tekrar deneyin!");
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
                    maxWidth: "560px",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    overflow: "hidden"
                }}
            >
                {/* MODAL HEADER */}
                <div
                    style={{
                        padding: "1.25rem 1.75rem",
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
                            <FiFolderPlus size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                Yeni Kategori Ekle
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                Ürünlerinizi gruplandırmak için kategori tanımlayın.
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

                {/* MODAL BODY */}
                <div style={{ padding: "1.75rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Kategori Adı */}
                    <div>
                        <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.88rem" }}>
                            <FiTag size={16} className="text-primary" /> Kategori Adı <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Örn: Ayakkabı, Gömlek, Aksesuar"
                            style={{
                                borderRadius: "10px",
                                padding: "10px 14px",
                                fontSize: "0.92rem",
                                boxShadow: "none",
                                border: "1px solid #cbd5e1"
                            }}
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    </div>

                    {/* Kategori Görseli Yükleme */}
                    <div>
                        <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.88rem" }}>
                            <FiUploadCloud size={16} className="text-primary" /> Kategori Görseli <span className="text-danger">*</span>
                        </label>

                        {!newCategoryImage ? (
                            <label
                                style={{
                                    border: dragging ? "2px dashed #2563eb" : "2px dashed #cbd5e1",
                                    borderRadius: "14px",
                                    padding: "2rem 1.5rem",
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
                                onDragLeave={() => setDragging(false)}
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
                                        width: "48px",
                                        height: "48px",
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
                                    <FiUploadCloud size={24} />
                                </div>
                                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#334155" }}>
                                    Kategori görselini sürükleyin veya seçin
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "3px" }}>
                                    PNG, JPG veya WEBP formatı önerilir
                                </span>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            handleFile(e.target.files[0]);
                                        }
                                    }}
                                    style={{ display: "none" }}
                                />
                            </label>
                        ) : (
                            <div
                                style={{
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "14px",
                                    padding: "1rem",
                                    backgroundColor: "#f8fafc",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "1rem"
                                }}
                            >
                                <div className="d-flex align-items-center gap-3 overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(newCategoryImage)}
                                        alt="Kategori Önizleme"
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
                                            {newCategoryImage.name}
                                        </p>
                                        <small className="text-secondary" style={{ fontSize: "0.75rem" }}>
                                            {(newCategoryImage.size / 1024).toFixed(1)} KB
                                        </small>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setNewCategoryImage(null)}
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

                {/* MODAL FOOTER */}
                <div
                    style={{
                        padding: "1.25rem 1.75rem",
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
                        onClick={handleSubmit}
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
                        {isSubmitting ? "Kaydediliyor..." : "Kategoriyi Kaydet"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryPopup;
