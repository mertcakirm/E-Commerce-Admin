import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import {GetCategoriesRequest} from "../../API/CategoriesApi.js";
import {
    AddProductImageRequest,
    AddStockRequest,
    DeleteProductImageRequest,
    DeleteStockRequest,
    GetProductDetailRequest,
    UpdateProductRequest
} from "../../API/ProductApi.js";

const EditProduct = ({ onClose, productId }) => {
    const [categories, setCategories] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        basePrice: 0,
        categoryId: "",
        variants: [],
        totalStock: 0,
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [newVariant, setNewVariant] = useState({ size: "", stock: 0 });

    useEffect(() => {
        AOS.init({ duration: 500 });
        getDropdown();
        fetchProduct();
    }, [productId,refresh]);

    const getDropdown = async () => {
        const categoriesObj = await GetCategoriesRequest();
        setCategories(categoriesObj.data);
    };

    const fetchProduct = async () => {
        try {
            const res = await GetProductDetailRequest(productId)
            const p = res.data.data;

            setProductData({
                name: p.name,
                description: p.description,
                price: p.price,
                basePrice: p.basePrice ?? 0,
                categoryId: p.categoryId,
                variants: p.variants || [],
                totalStock: (p.variants || []).reduce((t, v) => t + v.stock, 0),
            });

            // Mevcut görselleri (id + imageUrl) kaydet
            setExistingImages(p.images || []);
        } catch (err) {
            console.error("Ürün çekilemedi:", err);
        }
    };

    // --- Input & Variant ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVariantChange = (index, field, value) => {
        const updated = [...productData.variants];
        updated[index][field] = value;
        setProductData((prev) => ({ ...prev, variants: updated }));
    };

    const addVariant = async () => {
        if (!newVariant.size || newVariant.stock < 0) return;

        try {
            await AddStockRequest(productId,newVariant.size,newVariant.stock);
            setNewVariant({ size: "", stock: 0 });
            setRefresh(!refresh);
            toast.success("Stok eklendi!")

        }catch (error){
            console.log(error);
            toast.error("Stok eklenemedi!")
        }

    };

    const removeVariant = async (id) => {
        try {
            await DeleteStockRequest(id);
            toast.success("Stok kaldırıldı!")
            setRefresh(!refresh);
        }catch (error) {
            console.log(error);
            toast.error("Stok kaldırılamadı!")
        }
    };

    // --- Görseller ---
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("File", file));

            await AddProductImageRequest(productId, formData);
            toast.success("Görseller başarıyla yüklendi!");
            setNewImages([]);
            setRefresh(!refresh);
        } catch (err) {
            console.error("Görsel yükleme hatası:", err);
            toast.error("Görsel yüklenemedi!");
        }
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        setNewImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    };

    const removeExistingImage = async (id) => {
        try {
            setExistingImages((prev) => prev.filter((img) => img.id !== id));
            await DeleteProductImageRequest(id);
            toast.success("Görsel silindi!")
        }
        catch (errow){
            console.log(errow);
            toast.error("Görsel silinemedi!")

        }

    };

    const removeNewImage = (file) => {
        setNewImages((prev) => prev.filter((img) => img !== file));
    };

    // --- Submit ---
    const handleSubmit = async () => {

        const payload = {
            name: productData.name,
            description: productData.description,
            basePrice: productData.basePrice,
            price: productData.price,
            categoryId: productData.categoryId
        };

        try {
            await UpdateProductRequest(productId, payload);
            toast.success("Ürün güncellendi!");
            onClose();
        } catch (err) {
            console.error("Güncelleme hatası:", err);
            toast.error("Ürün güncellenemedi!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{ width: "1200px" }}>
                <div className="popup-header">
                    <div></div>
                    <button className="popup-close-btn" onClick={()=>onClose(false)}>
                        &times;
                    </button>
                </div>

                <div className="popup-form">
                    <div className="row row-gap-3 column-gap-3 justify-content-between">

                        {/* ---- Resim Yönetimi ---- */}
                        <div className="col-5">
                            <h4>Resim Yönetim Paneli</h4>
                            <div
                                className="drop-zone"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="purple" viewBox="0 0 24 24">
                                        <path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/>
                                    </svg>
                                    <p>Ürün görsellerini sürükleyin veya seçmek için tıklayın</p>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
                            </div>

                            {/* Mevcut Görseller */}
                            <div className="preview-flex mt-2">
                                {existingImages.map((img) => (
                                    <div className="preview-flex-child" key={img.id}>
                                        <img
                                            src={`https://localhost:7050${img.imageUrl}`}
                                            alt={`old-${img.id}`}
                                            width="100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(img.id)}
                                            className="btn btn-sm btn-danger mt-1"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Yeni Görseller */}
                            <div className="preview-flex mt-3">
                                {newImages.map((file, idx) => (
                                    <div className="preview-flex-child" key={idx}>
                                        <img src={URL.createObjectURL(file)} alt={`new-${idx}`} width="100" />
                                        <p>{file.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(file)}
                                            className="btn btn-sm btn-warning mt-1"
                                        >
                                            Kaldır
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ---- Stok / Variant ---- */}
                        <div className="col-5">
                            <h4>Stok Yönetim Paneli</h4>
                            {productData.variants.map((v, idx) => (
                                <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={v.size || ""}
                                        onChange={(e) => handleVariantChange(idx, "size", e.target.value)}
                                        className="form-control w-25"
                                    />
                                    <input
                                        type="number"
                                        value={v.stock || 0}
                                        onChange={(e) =>
                                            handleVariantChange(idx, "stock", parseInt(e.target.value) || 0)
                                        }
                                        className="form-control w-25"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(v.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))}

                            <div className="d-flex gap-2 mt-3">
                                <input
                                    type="text"
                                    placeholder="Beden"
                                    value={newVariant.size}
                                    onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                                    className="form-control w-25"
                                />
                                <input
                                    type="number"
                                    placeholder="Stok"
                                    value={newVariant.stock}
                                    onChange={(e) =>
                                        setNewVariant({ ...newVariant, stock: parseInt(e.target.value) || 0 })
                                    }
                                    className="form-control w-25"
                                />
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="btn btn-success btn-sm"
                                >
                                    Ekle
                                </button>
                            </div>
                        </div>

                        {/* ---- Ürün Temel Bilgiler ---- */}
                        <h4 className="mt-4">Ürün Yönetim Paneli</h4>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ürün Adı"
                            value={productData.name}
                            onChange={handleInputChange}
                            className="col-5 form-control"
                        />

                        <select
                            name="categoryId"
                            value={productData.categoryId}
                            onChange={handleInputChange}
                            className="col-5 form-control"
                        >
                            <option value="">Ürün Kategorisi Seçin</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            name="basePrice"
                            placeholder="Ürün Alış Fiyatı"
                            value={productData.basePrice}
                            onChange={handleInputChange}
                            className="col-5 form-control"
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Ürün Satış Fiyatı"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="col-5 form-control"
                        />
                        <textarea
                            name="description"
                            placeholder="Ürün Açıklaması"
                            value={productData.description}
                            onChange={handleInputChange}
                            className="col-12 form-control"
                        />

                        <button onClick={handleSubmit} className="btn btn-primary mt-4">
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;