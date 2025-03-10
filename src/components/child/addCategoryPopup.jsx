import { useState } from "react";
import { addCategory } from "../../pages/api/kategoriapi.js";

const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const AddCategoryPopup = ({ popupCloser, reloadPageCat }) => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryType, setNewCategoryType] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "image") {
            setNewCategoryImage(files[0] || null);
        } else if (name === "name") {
            setNewCategoryName(value);
        } else if (name === "type") {
            setNewCategoryType(value);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewCategoryImage(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            setNewCategoryImage(files[0]);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!newCategoryImage) {
            alert("Lütfen bir resim seçin.");
            return;
        }

        try {
            const base64Image = await convertImageToBase64(newCategoryImage);
            const base64new = base64Image.split(",")[1];

            const categoryDTO = {
                image: { bytes: base64new },
                typeName: newCategoryType,
                categoryName: newCategoryName,
            };

            await addCategory(categoryDTO);
            popupCloser(false);
            reloadPageCat(true);
        } catch (error) {
            console.error("Kategori ekleme hatası:", error);
            alert("Kategori eklenirken bir hata oluştu!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{ width: "500px" }}>
                <div className="popup-header">
                    <h2>Kategori Ekle</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>
                <div className="row row-gap-5 justify-content-around column-gap-3 mt-5">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Kategori Adı"
                        className="col-5 popup-inp"
                        style={{ height: "40px" }}
                        value={newCategoryName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="type"
                        className="col-5 popup-inp"
                        style={{ height: "40px" }}
                        placeholder="Kategori Türü"
                        name="type"
                        value={newCategoryType}
                        onChange={handleChange}
                        required
                    />
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                    >
                        {newCategoryImage ? (
                            <p>{newCategoryImage.name}</p>
                        ) : (
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="purple" viewBox="0 0 24 24">
                                    <path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/>
                                </svg>
                                 Kategori görselini buraya sürükleyin veya yükleyin
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            className="file-input"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">
                        Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryPopup;
