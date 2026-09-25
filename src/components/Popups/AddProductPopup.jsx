import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AddProductRequest,
    AddProductImageRequest,
    AddStockRequest,
    DeleteProductImageRequest,
    DeleteStockRequest,
    GetProductDetailRequest,
    UpdateProductRequest
} from "../../API/ProductApi.js";
import { GetCategoriesRequest } from "../../API/CategoriesApi.js";
import { 
    FiUploadCloud, 
    FiX, 
    FiPlus, 
    FiTrash2, 
    FiTag, 
    FiLayers, 
    FiDollarSign, 
    FiFileText, 
    FiCheckCircle 
} from "react-icons/fi";

const ProductPopup = ({ popupCloser, productId = null }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [productData, setProductData] = useState({
        Name: "",
        CategoryIds: [],
        Description: "",
        Price: 0.0,
        BasePrice: 0.0,
        Variants: [],
    });

    // --- Kategorileri Çek ---
    const getDropdown = async () => {
        try {
            const res = await GetCategoriesRequest();
            setCategories(res?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    // --- Ürün Detayını Çek ---
    const fetchProduct = async () => {
        if (!productId) return;
        try {
            const res = await GetProductDetailRequest(productId);
            const p = res?.data?.data;

            setProductData({
                Name: p?.name || "",
                Description: p?.description || "",
                Price: p?.price ?? 0,
                BasePrice: p?.basePrice ?? 0,
                CategoryIds: p?.categoryIds || [],
                Variants: p?.variants || [],
            });

            setExistingImages(p?.images || []);
        } catch (err) {
            console.error("Ürün detay hatası:", err);
            toast.error("Ürün detayları alınamadı!");
        }
    };

    useEffect(() => {
        getDropdown();
        if (productId) fetchProduct();
    }, [productId, refresh]);

    // --- Kategori Ekle / Sil ---
    const handleAddCategory = () => {
        const id = parseInt(selectedCategory);
        if (!id || productData.CategoryIds.includes(id)) return;

        setProductData(prev => ({
            ...prev,
            CategoryIds: [...prev.CategoryIds, id]
        }));
        setSelectedCategory("");
    };

    const handleRemoveCategory = (id) => {
        setProductData(prev => ({
            ...prev,
            CategoryIds: prev.CategoryIds.filter(c => c !== id)
        }));
    };

    // --- Görsel Yükleme ---
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (!productId) {
            setImages(prev => [...prev, ...files]);
            return;
        }
        try {
            const formData = new FormData();
            files.forEach((f) => formData.append("File", f));
            await AddProductImageRequest(productId, formData);
            toast.success("Görseller eklendi!");
            setRefresh(!refresh);
        } catch (err) {
            console.error(err);
            toast.error("Görseller yüklenemedi!");
        }
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = async (id) => {
        try {
            await DeleteProductImageRequest(id);
            toast.success("Görsel silindi!");
            setExistingImages(prev => prev.filter(img => img.id !== id));
        } catch (err) {
            console.error(err);
            toast.error("Görsel silinemedi!");
        }
    };

    // --- Stok İşlemleri ---
    const addStock = async (event) => {
        event.preventDefault();
        if (!sizeInput.trim() || !quantityInput) return;
        const qty = parseInt(quantityInput, 10);
        if (qty <= 0) return;

        if (productId) {
            try {
                await AddStockRequest(productId, sizeInput.toUpperCase().trim(), qty);
                toast.success("Stok eklendi!");
                setRefresh(!refresh);
            } catch (err) {
                console.error(err);
                toast.error("Stok eklenemedi!");
            }
        } else {
            const updatedVariants = [...productData.Variants];
            const found = updatedVariants.find(v => v.size === sizeInput.toUpperCase().trim());
            if (found) {
                found.stock += qty;
            } else {
                updatedVariants.push({ size: sizeInput.toUpperCase().trim(), stock: qty });
            }

            setProductData(prev => ({
                ...prev,
                Variants: updatedVariants
            }));
        }

        setSizeInput("");
        setQuantityInput("");
    };

    const handleRemoveVariant = async (variant) => {
        if (productId && variant.id) {
            try {
                await DeleteStockRequest(variant.id);
                toast.success("Stok kaldırıldı!");
                setRefresh(!refresh);
            } catch (err) {
                console.error(err);
                toast.error("Stok kaldırılamadı!");
            }
        } else {
            setProductData(prev => ({
                ...prev,
                Variants: prev.Variants.filter(v => v.size !== variant.size)
            }));
        }
    };

    // --- Ürün Kaydet / Güncelle ---
    const handleSubmit = async () => {
        if (!productData.Name.trim()) {
            toast.warn("Lütfen ürün adını giriniz.");
            return;
        }

        setIsSubmitting(true);
        try {
            if (productId) {
                const payload = {
                    name: productData.Name,
                    description: productData.Description,
                    basePrice: productData.BasePrice,
                    price: productData.Price,
                    categoryIds: productData.CategoryIds
                };
                await UpdateProductRequest(productId, payload);
                toast.success("Ürün başarıyla güncellendi!");
            } else {
                const formData = new FormData();
                formData.append("Name", productData.Name);
                formData.append("Description", productData.Description);
                formData.append("BasePrice", productData.BasePrice);
                formData.append("Price", productData.Price);

                productData.CategoryIds.forEach((cid, index) => {
                    formData.append(`CategoryIds[${index}]`, cid);
                });
                productData.Variants.forEach((v, index) => {
                    formData.append(`Variants[${index}].Size`, v.size);
                    formData.append(`Variants[${index}].Stock`, v.stock);
                });
                images.forEach((image) => formData.append("Images", image));

                await AddProductRequest(formData);
                toast.success("Ürün başarıyla oluşturuldu!");
            }
            popupCloser(false);
        } catch (err) {
            console.error(err);
            toast.error("İşlem başarısız oldu!");
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
                    maxWidth: "1080px",
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
                            <FiLayers size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                {productId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                {productId ? `ID: #${productId} ürün detaylarını güncelliyorsunuz.` : "Katalogunuza yeni bir ürün tanımlayın."}
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

                {/* MODAL BODY (SCROLLABLE) */}
                <div style={{ padding: "1.75rem 2rem", overflowY: "auto", flexGrow: 1 }}>
                    <div className="row g-4">
                        
                        {/* SOL SÜTUN: Görseller, Kategori & Stok */}
                        <div className="col-12 col-lg-6 d-flex flex-column gap-4">
                            
                            {/* Görseller Alanı */}
                            <div>
                                <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.88rem" }}>
                                    <FiUploadCloud size={16} className="text-primary" /> Ürün Görselleri
                                </label>
                                <label
                                    style={{
                                        border: "2px dashed #cbd5e1",
                                        borderRadius: "14px",
                                        padding: "1.5rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backgroundColor: "#f8fafc",
                                        transition: "all 0.2s",
                                        width: "100%",
                                        margin: 0
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = "#3b82f6"}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = "#cbd5e1"}
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
                                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
                                        Görselleri buraya sürükleyin veya seçin
                                    </span>
                                    <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                                        PNG, JPG veya WEBP (Çoklu seçim desteklenir)
                                    </span>
                                    <input type="file" multiple onChange={handleImageUpload} style={{ display: "none" }} />
                                </label>

                                {/* Görsel Önizleme Galerisi */}
                                {(existingImages.length > 0 || images.length > 0) && (
                                    <div className="d-flex flex-wrap gap-2 mt-3 p-2 bg-light rounded-3 border">
                                        {existingImages.map((img) => (
                                            <div
                                                key={img.id}
                                                style={{
                                                    position: "relative",
                                                    width: "74px",
                                                    height: "74px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",
                                                    border: "1px solid #e2e8f0"
                                                }}
                                            >
                                                <img
                                                    src={`https://localhost:7050${img.imageUrl}`}
                                                    alt="Mevcut Görsel"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveExistingImage(img.id)}
                                                    style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        backgroundColor: "rgba(239, 68, 68, 0.9)",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "50%",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        padding: 0
                                                    }}
                                                >
                                                    <FiTrash2 size={11} />
                                                </button>
                                            </div>
                                        ))}

                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: "relative",
                                                    width: "74px",
                                                    height: "74px",
                                                    borderRadius: "10px",
                                                    overflow: "hidden",
                                                    border: "2px solid #3b82f6"
                                                }}
                                            >
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="Yeni Görsel"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        backgroundColor: "rgba(239, 68, 68, 0.9)",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "50%",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        padding: 0
                                                    }}
                                                >
                                                    <FiTrash2 size={11} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Kategori Seçimi */}
                            <div>
                                <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.88rem" }}>
                                    <FiTag size={16} className="text-primary" /> Kategoriler
                                </label>
                                <div className="input-group">
                                    <select
                                        className="form-select border-slate-300"
                                        style={{ borderRadius: "10px 0 0 10px", fontSize: "0.9rem", boxShadow: "none" }}
                                        value={selectedCategory}
                                        onChange={e => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Kategori Seçin...</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-primary d-flex align-items-center gap-1"
                                        style={{ borderRadius: "0 10px 10px 0", padding: "0 18px", fontWeight: 600, fontSize: "0.88rem" }}
                                        onClick={handleAddCategory}
                                    >
                                        <FiPlus size={16} /> Ekle
                                    </button>
                                </div>

                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {productData.CategoryIds.length > 0 ? (
                                        productData.CategoryIds.map(id => {
                                            const cat = categories.find(c => c.id === id);
                                            return cat ? (
                                                <span
                                                    key={id}
                                                    style={{
                                                        backgroundColor: "#eff6ff",
                                                        color: "#1d4ed8",
                                                        borderRadius: "8px",
                                                        padding: "4px 10px",
                                                        fontSize: "0.82rem",
                                                        fontWeight: 500,
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        border: "1px solid #dbeafe"
                                                    }}
                                                >
                                                    {cat.name}
                                                    <FiX
                                                        size={14}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleRemoveCategory(id)}
                                                    />
                                                </span>
                                            ) : null;
                                        })
                                    ) : (
                                        <small className="text-muted" style={{ fontSize: "0.78rem" }}>Seçilen kategori yok.</small>
                                    )}
                                </div>
                            </div>

                            {/* Stok ve Varyant Yönetimi */}
                            <div>
                                <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.88rem" }}>
                                    <FiLayers size={16} className="text-primary" /> Stok & Varyant
                                </label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Beden (örn: M, 42)"
                                        style={{ borderRadius: "10px", fontSize: "0.9rem", boxShadow: "none" }}
                                        value={sizeInput}
                                        onChange={e => setSizeInput(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Adet"
                                        style={{ borderRadius: "10px", fontSize: "0.9rem", width: "120px", boxShadow: "none" }}
                                        value={quantityInput}
                                        onChange={e => setQuantityInput(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary d-flex align-items-center gap-1"
                                        style={{ borderRadius: "10px", fontWeight: 600, fontSize: "0.88rem", whiteSpace: "nowrap" }}
                                        onClick={addStock}
                                    >
                                        <FiPlus size={16} /> Ekle
                                    </button>
                                </div>

                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {productData.Variants.length > 0 ? (
                                        productData.Variants.map((item, idx) => (
                                            <span
                                                key={idx}
                                                style={{
                                                    backgroundColor: "#f8fafc",
                                                    color: "#334155",
                                                    borderRadius: "8px",
                                                    padding: "5px 12px",
                                                    fontSize: "0.82rem",
                                                    fontWeight: 600,
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    border: "1px solid #e2e8f0"
                                                }}
                                            >
                                                <span>{item.size}</span>
                                                <span className="badge bg-secondary-subtle text-secondary rounded-pill">{item.stock} ad.</span>
                                                <FiTrash2
                                                    size={13}
                                                    className="text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleRemoveVariant(item)}
                                                />
                                            </span>
                                        ))
                                    ) : (
                                        <small className="text-muted" style={{ fontSize: "0.78rem" }}>Henüz varyant eklenmedi.</small>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* SAĞ SÜTUN: Temel Bilgiler, Fiyatlar ve Açıklama */}
                        <div className="col-12 col-lg-6 d-flex flex-column gap-3">
                            
                            <div>
                                <label className="form-label fw-bold text-dark mb-1" style={{ fontSize: "0.88rem" }}>
                                    Ürün Adı <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ürünün tam adını girin"
                                    style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none" }}
                                    value={productData.Name}
                                    onChange={e => setProductData(prev => ({ ...prev, Name: e.target.value }))}
                                />
                            </div>

                            <div className="row g-2">
                                {!productId && (
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-dark d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.88rem" }}>
                                            <FiDollarSign size={14} className="text-muted" /> Alış Fiyatı (₺)
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                            style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none" }}
                                            value={productData.BasePrice}
                                            onChange={e => setProductData(prev => ({
                                                ...prev,
                                                BasePrice: parseFloat(e.target.value) || 0
                                            }))}
                                        />
                                    </div>
                                )}
                                <div className={!productId ? "col-6" : "col-12"}>
                                    <label className="form-label fw-bold text-dark d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.88rem" }}>
                                        <FiDollarSign size={14} className="text-success" /> Satış Fiyatı (₺) <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="0.00"
                                        style={{ borderRadius: "10px", padding: "10px 14px", fontSize: "0.92rem", boxShadow: "none" }}
                                        value={productData.Price}
                                        onChange={e => setProductData(prev => ({
                                            ...prev,
                                            Price: parseFloat(e.target.value) || 0
                                        }))}
                                    />
                                </div>
                            </div>

                            <div className="flex-grow-1 d-flex flex-column">
                                <label className="form-label fw-bold text-dark d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.88rem" }}>
                                    <FiFileText size={14} className="text-muted" /> Ürün Açıklaması
                                </label>
                                <textarea
                                    className="form-control flex-grow-1"
                                    placeholder="Ürüne dair teknik detaylar, kumaş veya garanti bilgileri..."
                                    style={{
                                        borderRadius: "12px",
                                        padding: "12px",
                                        fontSize: "0.9rem",
                                        resize: "none",
                                        minHeight: "170px",
                                        boxShadow: "none"
                                    }}
                                    value={productData.Description}
                                    onChange={e => setProductData(prev => ({ ...prev, Description: e.target.value }))}
                                />
                            </div>

                        </div>

                    </div>
                </div>

                {/* MODAL FOOTER */}
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
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: "#2563eb",
                            border: "none",
                            padding: "9px 26px",
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
                        {isSubmitting ? "Kaydediliyor..." : productId ? "Değişiklikleri Güncelle" : "Ürünü Yayınla"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductPopup;
