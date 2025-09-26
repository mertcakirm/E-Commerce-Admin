import { useEffect, useState } from "react";
import { AddCategoryRequest, GetCategoriesRequest } from "../../API/CategoriesApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

const AddCategoryPopup = ({ popupCloser, reloadPageCat }) => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryType, setNewCategoryType] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 500 });
        getDropdown();
    }, []);

    const getDropdown = async () => {
        try {
            const categoriesObj = await GetCategoriesRequest();
            setCategories(categoriesObj.data);
        } catch (err) {
            console.error("Kategori çekilemedi:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files && files.length > 0) {
            setNewCategoryImage(files[0]);
        } else if (name === "name") {
            setNewCategoryName(value);
        } else if (name === "type") {
            setNewCategoryType(value);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setNewCategoryImage(e.dataTransfer.files[0]);
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

        const formData = new FormData();
        formData.append("Name", newCategoryName);
        formData.append("ParentCategoryId", newCategoryType || ""); // boş olabilir
        formData.append("Image", newCategoryImage);

        try {
            await AddCategoryRequest(formData);
            toast.success("Kategori başarıyla eklendi!");
            popupCloser(false);
            reloadPageCat(true);
        } catch (error) {
            console.error("Kategori ekleme hatası:", error);
            toast.error("Kategori eklenemedi, lütfen tekrar deneyin!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{ width: "600px" }}>
                <div className="popup-header">
                    <h2>Kategori Ekle</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>

                <div className="row row-gap-5 justify-content-around column-gap-3 mt-5">
                    {/* Kategori Adı */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Kategori Adı"
                        className="col-5 popup-inp"
                        style={{ height: "50px" }}
                        value={newCategoryName}
                        onChange={handleChange}
                        required
                    />

                    {/* Üst Kategori Seçimi */}
                    <select
                        name="type"
                        value={newCategoryType}
                        onChange={handleChange}
                        className="col-5 popup-inp"
                    >
                        <option value="">Üst Kategori Seçin</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {/* Dropzone */}
                    <div
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setDragging(false)}
                    >
                        {newCategoryImage ? (
                            <p>{newCategoryImage.name}</p>
                        ) : (
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="purple"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z" />
                                </svg>
                                <p>Kategori görselini sürükleyin veya seçmek için tıklayın</p>
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="file-input"
                            onChange={handleChange}
                        />
                    </div>

                    <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12 mt-3">
                        Kategoriyi Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryPopup;