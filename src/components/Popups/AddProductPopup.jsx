import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    AddProductRequest,
    AddProductImageRequest,
    AddStockRequest,
    DeleteProductImageRequest,
    DeleteStockRequest,
    GetProductDetailRequest,
    UpdateProductRequest
} from "../../API/ProductApi.js";
import {GetCategoriesRequest} from "../../API/CategoriesApi.js";

const ProductPopup = ({popupCloser, productId = null}) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [refresh, setRefresh] = useState(false);

    const [productData, setProductData] = useState({
        Name: "",
        CategoryIds: [],
        Description: "",
        Price: 0.0,
        BasePrice: 0.0,
        Variants: [],
    });

    // --- Kategorileri çek ---
    const getDropdown = async () => {
        const res = await GetCategoriesRequest();
        setCategories(res.data);
    };

    // --- Eğer productId varsa ürünü getir ---
    const fetchProduct = async () => {
        if (!productId) return;
        try {
            const res = await GetProductDetailRequest(productId);
            const p = res.data.data;

            setProductData({
                Name: p.name,
                Description: p.description,
                Price: p.price,
                BasePrice: p.basePrice ?? 0,
                CategoryIds: p.categoryIds || [],
                Variants: p.variants || [],
            });

            setExistingImages(p.images || []);
        } catch (err) {
            console.error("Ürün detay hatası:", err);
            toast.error("Ürün detayları alınamadı!");
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
        getDropdown();
        if (productId) fetchProduct();
    }, [productId, refresh]);

    // --- Kategori ekle / sil ---
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

    // --- Görsel yükleme ---
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
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

    // --- Stok işlemleri ---
    const addStock = async (event) => {
        event.preventDefault();
        if (!sizeInput || !quantityInput) return;
        const qty = parseInt(quantityInput, 10);

        if (productId) {
            // Güncelleme modunda API çağrısı
            try {
                await AddStockRequest(productId, sizeInput.toUpperCase(), qty);
                toast.success("Stok eklendi!");
                setRefresh(!refresh);
            } catch (err) {
                console.error(err);
                toast.error("Stok eklenemedi!");
            }
        } else {
            // Yeni ürün modunda local state
            const updatedVariants = [...productData.Variants];
            const found = updatedVariants.find(v => v.size === sizeInput.toUpperCase());
            if (found) found.stock += qty;
            else updatedVariants.push({size: sizeInput.toUpperCase(), stock: qty});

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

    // --- Ürün kaydet / güncelle ---
    const handleSubmit = async () => {
        try {
            if (productId) {
                // Güncelleme
                const payload = {
                    name: productData.Name,
                    description: productData.Description,
                    basePrice: productData.BasePrice,
                    price: productData.Price,
                    categoryIds: productData.CategoryIds
                };
                await UpdateProductRequest(productId, payload);
                toast.success("Ürün güncellendi!");
            } else {
                // Yeni ürün ekleme
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
                toast.success("Ürün başarıyla eklendi!");
            }

            popupCloser(false);
        } catch (err) {
            console.error(err);
            toast.error("İşlem başarısız!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "1200px"}}>
                <div className="popup-header">
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>

                <div className="popup-form row">
                    <div className="col-12 fs-2 fw-bold text-center mb-3">
                        {productId ? "Ürün Düzenleme Paneli" : "Ürün Ekleme Paneli"}
                    </div>

                    {/* SOL TARAF */}
                    <div className="col-6">
                        {/* Görseller */}
                        <div className="drop-zone" onDragOver={e => e.preventDefault()}>
                            <p>Ürün görsellerini sürükleyin veya seçmek için tıklayın</p>
                            <input type="file" multiple onChange={handleImageUpload} className="file-input"/>
                        </div>

                        <div className="preview-flex mb-3">
                            {existingImages.map((img) => (
                                <div key={img.id}
                                     className="preview-flex-child border shadow-sm rounded-3 overflow-hidden">
                                    <img className="object-fit-cover h-100
                                    " src={`https://localhost:7050${img.imageUrl}`} alt="existing" width="100"/>
                                    <button className="user-sil-btn px-2 w-100 fs-6"
                                            onClick={() => handleRemoveExistingImage(img.id)}>Sil
                                    </button>
                                </div>
                            ))}

                            {images.map((image, index) => (
                                <div key={index} className="preview-flex-child">
                                    <img src={URL.createObjectURL(image)} alt={`img-${index}`} width="100"/>
                                    <p>{image.name}</p>
                                    <button className="user-sil-btn px-2 fs-6"
                                            onClick={() => handleRemoveImage(index)}>Sil
                                    </button>
                                </div>
                            ))}
                        </div>


                        {/* Kategori Seçimi */}

                        <div className="d-flex flex-column gap-2">
                            <label className="fw-bold">Kategori Seçimi</label>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                    <option value="">Kategori Seçin</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <button className="tumunu-gor-btn-admin fs-6 py-2 px-3" onClick={handleAddCategory}>Ekle
                                </button>
                            </div>
                        </div>

                        <div
                            className="selected-categories mb-3 d-flex flex-wrap gap-2"
                        >
                            {productData.CategoryIds.length > 0 ? (
                                productData.CategoryIds.map(id => {
                                    const cat = categories.find(c => c.id === id);
                                    return cat ? (
                                        <div
                                            key={id}
                                            className="d-flex gap-2 align-items-center justify-content-between border rounded-3 shadow-sm overflow-hidden "
                                            style={{width: "fit-content"}}
                                        >
                                            <span className="category-chip mx-2">{cat.name}</span>
                                            <button
                                                className="user-sil-btn px-2 fs-6"
                                                onClick={() => handleRemoveCategory(id)}
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    ) : null;
                                })
                            ) : (
                                <p className="text-muted">Henüz kategori seçilmedi.</p>
                            )}
                        </div>

                        {/* Stok Yönetimi */}
                        <div className="d-flex flex-column gap-2">

                            <label className="fw-bold">Stok Yönetimi</label>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <input type="text" placeholder="Beden" value={sizeInput}
                                       onChange={e => setSizeInput(e.target.value)}/>
                                <input type="number" placeholder="Adet" value={quantityInput}
                                       onChange={e => setQuantityInput(e.target.value)}/>
                                <button className="tumunu-gor-btn-admin fs-6 py-2 px-3" onClick={addStock}>Ekle</button>
                            </div>
                        </div>

                        <div className="stoklar-card-flex mb-3">
                            {productData.Variants.map((item, idx) => (
                                <div key={idx}
                                     className="d-flex gap-2 justify-content-between align-items-center border rounded-2 overflow-hidden">
                                    <span className="mx-2">
                                    {item.size}: {item.stock}
                                    </span>
                                    <button className="user-sil-btn  px-2 fs-6"
                                            onClick={() => handleRemoveVariant(item)}>Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ TARAF */}
                    <div className="col-6 d-flex flex-column gap-3">

                        <label>Ürün Adı</label>
                        <input
                            type="text"
                            placeholder="Ürün Adı"
                            value={productData.Name}
                            onChange={e => setProductData(prev => ({...prev, Name: e.target.value}))}
                        />

                        {productId ? null : (
                            <div className="d-flex flex-column gap-3">
                                <label>Alış Fiyatı</label>
                                <input
                                    type="number"
                                    placeholder="Alış Fiyatı"
                                    value={productData.BasePrice}
                                    onChange={e => setProductData(prev => ({
                                        ...prev,
                                        BasePrice: parseFloat(e.target.value)
                                    }))}
                                />
                            </div>
                        )}


                        <label>Satış Fiyatı</label>
                        <input
                            type="number"
                            placeholder="Satış Fiyatı"
                            value={productData.Price}
                            onChange={e => setProductData(prev => ({...prev, Price: parseFloat(e.target.value)}))}
                        />

                        <label>Açıklama</label>
                        <textarea
                            placeholder="Ürün Açıklaması"
                            value={productData.Description}
                            style={{height: "200px", resize: "none"}}
                            onChange={e => setProductData(prev => ({...prev, Description: e.target.value}))}
                        />

                        <button className="tumunu-gor-btn-admin mt-3" onClick={handleSubmit}>
                            {productId ? "Güncelle" : "Kaydet"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPopup;