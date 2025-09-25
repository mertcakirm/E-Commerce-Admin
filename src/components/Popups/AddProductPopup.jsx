import {useEffect, useState} from "react";
import {AddProductRequest} from "../../API/ProductApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import {GetCategoriesRequest} from "../../API/CategoriesApi.js";
import {convertImageToBase64} from "../../Helpers/Helper.js";

const AddProductPopup = ({popupCloser, reload}) => {
    const [productData, setProductData] = useState({
        Name: "",
        CategoryId: 0,
        Description: "",
        Price: 0.0,
        BasePrice: 0.0,
        Variants: [],
    });
    const [images, setImages] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [categories, setCategories] = useState([]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: name === "productPrice" || name === "BasePrice" ? parseFloat(value) || 0.0 : value,
        }));
    };

    const getDropdown = async () => {
        const categoriesObj = await GetCategoriesRequest();
        setCategories(categoriesObj.data);
    };

    useEffect(() => {
        AOS.init({duration: 500});

        getDropdown();
    }, []);


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
            const updatedSizes = [...productData.Variants];
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
                Variants: updatedSizes,
                totalStock,
            }));

            setSizeInput("");
            setQuantityInput("");
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            // Ürün bilgilerini ekliyoruz
            formData.append("Name", productData.Name);
            formData.append("Description", productData.Description);
            formData.append("BasePrice", productData.BasePrice);
            formData.append("Price", productData.Price);
            formData.append("CategoryId", productData.CategoryId);

            // Variants dizisini JSON string olarak ekliyoruz
            formData.append("Variants", JSON.stringify(productData.Variants));

            // Resimleri ekliyoruz
            images.forEach((image) => {
                formData.append("Images", image); // backend IFormFile[] için "Images" olmalı
            });

            // API çağrısı
            await AddProductRequest(formData);

            toast.success("Ürün başarıyla oluşturuldu!");
            popupCloser(false);
            reload(true);

            // Formu temizle
            setProductData({
                Name: "",
                CategoryId: "",
                Description: "",
                Price: 0.0,
                BasePrice: 0.0,
                Variants: [],
                totalStock: 0,
            });
            setImages([]);
        } catch (err) {
            console.error(err);
            toast.error("Ürün eklenemedi, lütfen daha sonra tekrar deneyin!");
        }
    };


    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "1200px"}}>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="purple"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/>
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
                                    {productData.Variants.map((item, index) => (
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
                            name="Name"
                            placeholder="Ürün Adı"
                            value={productData.Name}
                            onChange={handleInputChange}
                            className="col-5"
                        />
                        <select
                            name="CategoryId"
                            value={productData.CategoryId}
                            onChange={handleInputChange}
                            className="col-5"
                        >
                            <option value="">Ürün Kategorisi Seçin</option>
                            {categories.map((category) => (
                                <option key={category} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="BasePrice"
                            placeholder="Ürün Alış Fiyatı"
                            value={productData.BasePrice}
                            onChange={handleInputChange}
                            className="col-5"
                        />
                        <input
                            type="number"
                            name="Price"
                            placeholder="Ürün Fiyatı"
                            value={productData.Price}
                            onChange={handleInputChange}
                            className="col-5"
                        />
                        <input
                            type="text"
                            name="Description"
                            placeholder="Ürün Açıklaması"
                            value={productData.Description}
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
