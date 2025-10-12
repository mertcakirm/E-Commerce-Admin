import {useEffect, useState} from "react";
import {AddProductRequest} from "../../API/ProductApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import {GetCategoriesRequest} from "../../API/CategoriesApi.js";

const AddProductPopup = ({popupCloser, reload}) => {
    const [productData, setProductData] = useState({
        Name: "",
        CategoryIds: [],
        Description: "",
        Price: 0.0,
        BasePrice: 0.0,
        Variants: [],
    });

    const [selectedCategory, setSelectedCategory] = useState(""); // Dropdown seçimi
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");

    const getDropdown = async () => {
        const categoriesObj = await GetCategoriesRequest();
        setCategories(categoriesObj.data);
    };

    useEffect(() => {
        AOS.init({duration: 500});
        getDropdown();
    }, []);

    const handleAddCategory = () => {
        const id = parseInt(selectedCategory, 10);
        if (!id || productData.CategoryIds.includes(id)) return;

        setProductData(prev => ({
            ...prev,
            CategoryIds: [...prev.CategoryIds, id]
        }));
    };

    const handleRemoveCategory = (id) => {
        setProductData(prev => ({
            ...prev,
            CategoryIds: prev.CategoryIds.filter(c => c !== id)
        }));
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        handleImageFiles(files);
    };

    const handleDragOver = (event) => event.preventDefault();

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleImageFiles(files);
    };

    const handleImageFiles = (files) => {
        const validImages = files.filter(file => file.type.startsWith("image/"));
        if (validImages.length > 0) setImages(prev => [...prev, ...validImages]);
    };

    // --- Stok ekleme ---
    const addStock = (event) => {
        event.preventDefault();
        if (!sizeInput || !quantityInput) return;

        const updatedVariants = [...productData.Variants];
        const qty = parseInt(quantityInput, 10);
        let found = false;

        for (let i = 0; i < updatedVariants.length; i++) {
            if (updatedVariants[i].size === sizeInput) {
                updatedVariants[i].stock += qty;
                found = true;
                break;
            }
        }

        if (!found) updatedVariants.push({size: sizeInput, stock: qty});

        setProductData(prev => ({
            ...prev,
            Variants: updatedVariants
        }));

        setSizeInput("");
        setQuantityInput("");
    };

    // --- Stok sil ---
    const handleRemoveVariant = (size) => {
        setProductData(prev => ({
            ...prev,
            Variants: prev.Variants.filter(v => v.size !== size)
        }));
    };

    // --- Resim sil ---
    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("Name", productData.Name);
            formData.append("Description", productData.Description);
            formData.append("BasePrice", productData.BasePrice);
            formData.append("Price", productData.Price);

            productData.CategoryIds.forEach((cid, index) => {
                formData.append(`CategoryIds[${index}]`, cid);
            });

            productData.Variants.forEach((variant, index) => {
                formData.append(`Variants[${index}].Size`, variant.size);
                formData.append(`Variants[${index}].Stock`, variant.stock);
            });

            images.forEach(image => formData.append("Images", image));

            await AddProductRequest(formData);

            toast.success("Ürün başarıyla oluşturuldu!");
            popupCloser(false);
            reload(true);

            setProductData({
                Name: "",
                CategoryIds: [],
                Description: "",
                Price: 0.0,
                BasePrice: 0.0,
                Variants: [],
            });
            setImages([]);
        } catch (err) {
            console.error(err);
            toast.error("Ürün eklenemedi, lütfen tekrar deneyin!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "1200px"}}>
                <div className="popup-header">
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>

                <div className="popup-form row">
                    <div className="col-6 d-flex flex-column gap-3">
                        <h4>Kategori Yönetim Paneli</h4>
                        <div className="d-flex gap-3">
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                    <option value="">Kategori Seçin</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <button className="tumunu-gor-btn-admin fs-6 py-2 px-3" onClick={handleAddCategory}>Ekle</button>
                            </div>
                            <div className="selected-categories mb-3">
                                {productData.CategoryIds.map(id => {
                                    const cat = categories.find(c => c.id === id);
                                    return cat ? (
                                        <span key={id} className="category-chip">
                                            {cat.name} <button className="user-sil-btn px-2 fs-6" onClick={() => handleRemoveCategory(id)}>Sil</button>
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        <h4>Stok Yönetim Paneli</h4>
                        <div className="d-flex align-items-center mb-2">
                            <input type="text" placeholder="Beden" value={sizeInput} onChange={e => setSizeInput(e.target.value)} />
                            <input type="number" placeholder="Adet" value={quantityInput} onChange={e => setQuantityInput(e.target.value)} />
                            <button className="tumunu-gor-btn-admin fs-6 py-2 px-3" onClick={addStock}>Stok Ekle</button>
                        </div>
                        <div className="stoklar-card-flex mb-3">
                            {productData.Variants.map((item, idx) => (
                                <div key={idx} className="stok-card">
                                    {item.size}: {item.stock}
                                    <button className="user-sil-btn mx-2 px-2 fs-6" onClick={() => handleRemoveVariant(item.size)}>Sil</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-6">
                        <h4>Resim Yönetim Paneli</h4>
                        <div className="drop-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
                            <div>
                                <p>Ürün görsellerini sürükleyin veya seçmek için tıklayın</p>
                            </div>
                            <input type="file" multiple onChange={handleImageUpload} className="file-input"/>
                        </div>
                        <div className="preview-flex mb-3">
                            {images.map((image, index) => (
                                <div key={index} className="preview-flex-child">
                                    <img src={URL.createObjectURL(image)} alt={`img-${index}`} width="100"/>
                                    <p>{image.name}</p>
                                    <button className="user-sil-btn px-2 fs-6" onClick={() => handleRemoveImage(index)}>Sil</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <h4>Ürün Bilgileri</h4>
                        <input type="text" placeholder="Ürün Adı" value={productData.Name} onChange={e => setProductData(prev => ({...prev, Name: e.target.value}))} />
                        <input type="number" placeholder="Alış Fiyatı" value={productData.BasePrice} onChange={e => setProductData(prev => ({...prev, BasePrice: parseFloat(e.target.value)}))} />
                        <input type="number" placeholder="Satış Fiyatı" value={productData.Price} onChange={e => setProductData(prev => ({...prev, Price: parseFloat(e.target.value)}))} />
                        <textarea placeholder="Ürün Açıklaması" value={productData.Description} onChange={e => setProductData(prev => ({...prev, Description: e.target.value}))} />
                        <button className="tumunu-gor-btn-admin" onClick={handleSubmit}>Kaydet</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddProductPopup;