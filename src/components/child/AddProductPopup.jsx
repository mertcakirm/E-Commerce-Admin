import React, {useEffect, useState} from "react";
import { addProduct } from "../../pages/api/productapi.js";
import { showNotification } from "../notification.jsx";

const AddProductPopup = ({ popupCloser }) => {
    const [productData, setProductData] = useState({
        productName: "",
        productCategory: "",
        productDescription: "",
        productPrice: 0.0,
        purchasePrice: 0.0,
        sizes: [],
    });
    const [totalStock, setTotalStock] = useState(0);
    const [images, setImages] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [categories, setCategories] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: name === "productPrice" || name === "purchasePrice" ? parseFloat(value) || 0.0 : value,
        }));
    };

    useEffect(() => {
        return () => {
            images.forEach((image) => URL.revokeObjectURL(image.preview));
        };
    }, [images]);

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.onerror = () => reject(new Error("Dosya okuma hatası"));

            reader.readAsDataURL(file);
        });
    };

    const addStock = (event) => {
        event.preventDefault();

        if (sizeInput && quantityInput) {
            const updatedSizes = [...productData.sizes];
            let found = false;

            for (let i = 0; i < updatedSizes.length; i++) {
                if (updatedSizes[i].size === sizeInput) {
                    updatedSizes[i].stock += parseInt(quantityInput, 10);
                    found = true;
                    break;
                }
            }

            if (!found) {
                updatedSizes.push({
                    size: sizeInput,
                    stock: parseInt(quantityInput, 10),
                });
            }

            const totalStock = updatedSizes.reduce((total, item) => total + item.stock, 0);

            setProductData((prev) => ({
                ...prev,
                sizes: updatedSizes,
                totalStock,
            }));

            setSizeInput("");
            setQuantityInput("");
        }
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imagePreviews = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => resolve({ file, preview: reader.result });
            });
        });

        Promise.all(imagePreviews).then(() => {
            setImages((prevImages) => [...prevImages, ...files]);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productDTO = {
            ...productData,
        };

        try {
            const imageBase64Array = [];
            for (const image of images) {
                if (image instanceof File || image instanceof Blob) {
                    const base64String = await convertImageToBase64(image);
                    imageBase64Array.push({ bytes: base64String });
                } else {
                    console.error("Hatalı dosya tipi: ", image);
                }
            }

            productDTO.images = imageBase64Array;
        } catch {
            console.log("resim hatalı");
        }

        addProduct(productDTO);
        showNotification(notificationRef, "Ürün başarıyla eklendi!");
        popupCloser(false);

        setProductData({
            productName: "",
            productCategory: "",
            productDescription: "",
            productPrice: 0.0,
            purchasePrice: 0.0,
            sizes: [],
            totalStock: 0,
        });
        setImages([]);
        setTimeout(() => setReloadPage((prev) => !prev), 500);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <div></div>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>
                <div className="popup-form" onClick={handleSubmit}>
                    <div className="row" style={{ rowGap: "10px" }}>
                        <div className="col-6">
                            <h4>Resim Yönetim Paneli</h4>
                            <input type="file" multiple onChange={handleImageUpload} />
                            <div className="preview-flex">
                                {images.map((image, index) => (
                                    <div className="preview-flex-child" key={index}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`uploaded-img-${index}`}
                                            width="100"
                                        />
                                        <p>{image.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-6">
                            <h4>Stok Yönetim Paneli</h4>
                            <div className="row mt-3">
                                <div className="col-3 row">
                                    <div style={{ padding: "0" }} className="col-6 stok-giris-inp">
                                        <input
                                            type="text"
                                            placeholder="XL"
                                            value={sizeInput}
                                            onChange={(e) => setSizeInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6 stok-giris-inp">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={quantityInput}
                                            onChange={(e) => setQuantityInput(e.target.value)}
                                        />
                                    </div>
                                    <button className="mt-3 col-12" onClick={addStock}>
                                        Stok Ekle
                                    </button>
                                </div>
                                <div className="col-9 stoklar-card-flex">
                                    {productData.sizes.map((item, index) => (
                                        <div key={index} className="stok-card">
                                            {item.size}: {item.stock}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h4>Ürün Yönetim Paneli</h4>
                        <input
                            type="text"
                            name="productName"
                            placeholder="Ürün Adı"
                            value={productData.productName}
                            onChange={handleInputChange}
                            className="col-12"
                        />
                        <select
                            name="productCategory"
                            value={productData.productCategory}
                            onChange={handleInputChange}
                            className="col-12"
                        >
                            <option value="">Ürün Kategorisi Seçin</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="productDescription"
                            placeholder="Ürün Açıklaması"
                            value={productData.productDescription}
                            onChange={handleInputChange}
                            className="col-12"
                        />
                        <input
                            type="number"
                            name="purchasePrice"
                            placeholder="Ürün Alış Fiyatı"
                            value={productData.purchasePrice}
                            onChange={handleInputChange}
                            className="col-12"
                        />
                        <input
                            type="number"
                            name="productPrice"
                            placeholder="Ürün Fiyatı"
                            value={productData.productPrice}
                            onChange={handleInputChange}
                            className="col-12"
                        />
                        <button onClick={handleSubmit} type="submit">
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPopup;
