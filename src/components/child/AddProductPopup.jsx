import {useEffect, useState} from "react";
import {categoryDropdown} from "../../pages/api/kategoriapi.js";
import {addProduct} from "../../pages/api/productapi.js";
import AOS from "aos";
import "aos/dist/aos.css";

const AddProductPopup = ({ popupCloser, reload }) => {
    const [productData, setProductData] = useState({
        productName: "",
        productCategory: "",
        productDescription: "",
        productPrice: 0.0,
        purchasePrice: 0.0,
        sizes: [],
    });
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

    const getDropdown = async () => {
        const categoriesObj = await categoryDropdown();
        setCategories(categoriesObj);
    };

    useEffect(() => {
        AOS.init({ duration: 500 });

        getDropdown();
    }, []);


    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.onerror = () => reject(new Error("Dosya okuma hatası"));
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        handleImageFiles(files);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleImageFiles(files);
    };

    const handleImageFiles = (files) => {
        const validImages = files.filter((file) => file.type.startsWith("image/"));
        if (validImages.length > 0) {
            setImages((prevImages) => [...prevImages, ...validImages]);
        } else {
            console.log("Geçersiz dosya formatı");
        }
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
            console.log("Resim hatalı");
        }

        await addProduct(productDTO);
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
        reload(true);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{ width: "1200px" }}>
                <div className="popup-header">
                    <div></div>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>
                <div className="popup-form">
                    <div className="row row-gap-3 column-gap-3 justify-content-between">
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
                        <div className="col-5">
                            <h4>Stok Yönetim Paneli</h4>
                            <div className="row row-gap-3 mt-3">
                                <div className="col-12 row justify-content-between align-items-center">
                                    <input
                                        type="text"
                                        className="col-3"
                                        placeholder="XL"
                                        value={sizeInput}
                                        onChange={(e) => setSizeInput(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="col-3"
                                        placeholder="0"
                                        value={quantityInput}
                                        onChange={(e) => setQuantityInput(e.target.value)}
                                    />
                                    <button className="mt-3 col-5 add-stock-btn" onClick={addStock}>
                                        Stok Ekle
                                    </button>
                                </div>
                                <div className="col-12 stoklar-card-flex p-0">
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
                            className="col-5"
                        />
                        <select
                            name="productCategory"
                            value={productData.productCategory}
                            onChange={handleInputChange}
                            className="col-5"
                        >
                            <option value="">Ürün Kategorisi Seçin</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="purchasePrice"
                            placeholder="Ürün Alış Fiyatı"
                            onChange={handleInputChange}
                            className="col-5"
                        />
                        <input
                            type="number"
                            name="productPrice"
                            placeholder="Ürün Fiyatı"
                            onChange={handleInputChange}
                            className="col-5"
                        />
                        <input
                            type="text"
                            name="productDescription"
                            placeholder="Ürün Açıklaması"
                            value={productData.productDescription}
                            onChange={handleInputChange}
                            className="col-12"
                        />

                        <button className="tumunu-gor-btn-admin" onClick={handleSubmit}>
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPopup;
