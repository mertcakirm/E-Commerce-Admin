import {useEffect, useState} from "react";
import {AddSliderRequest} from "../../API/PageContentsApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import {GetCategoriesRequest} from "../../API/CategoriesApi.js";

const AddSliderContentPopup = ({popupCloser}) => {
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [popUpData, setPopUpData] = useState({
        topTitle: "",
        middleTitle: "",
        underTitle: "",
        redirectAddress: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPopUpData(prev => ({...prev, [name]: value}));
    };

    const fetchCategory = async () => {
        const data = await GetCategoriesRequest();
        setCategories(data.data || []);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImageFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setImageFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleDragLeave = () => setDragging(false);

    useEffect(() => {
        AOS.init({duration: 500});
        fetchCategory();
    }, []);

    const handleSubmit = async () => {
        if (!imageFile) {
            toast.error("Lütfen bir görsel seçin");
            return;
        }

        const formData = new FormData();
        formData.append("Image", imageFile);               // IFormFile ile eşleşiyor
        formData.append("ParentName", popUpData.topTitle);
        formData.append("Name", popUpData.middleTitle);
        formData.append("SubName", popUpData.underTitle);
        formData.append("Href", popUpData.redirectAddress);

        try {
            await AddSliderRequest(formData);
            toast.success("Slider başarıyla eklendi!");
            popupCloser(false);
        } catch (error) {
            console.error("Request error: ", error);
            toast.error("Slider eklenemedi, lütfen tekrar deneyin!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "600px"}}>
                <div className="popup-header">
                    <h2>Slider Ekle</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>

                <div className="form-group row row-gap-4 justify-content-center column-gap-1 align-items-center mt-4">
                    <input
                        type="text"
                        name="topTitle"
                        className="popup-inp col-12"
                        placeholder="Kampanya Üst Başlığı"
                        value={popUpData.topTitle}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="middleTitle"
                        className="popup-inp col-12"
                        placeholder="Kampanya Orta Başlığı"
                        value={popUpData.middleTitle}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="underTitle"
                        className="popup-inp col-12"
                        placeholder="Kampanya Alt Başlığı"
                        value={popUpData.underTitle}
                        onChange={handleChange}
                        required
                    />
                    <select
                        className="col-12"
                        id="redirectAddress"
                        name="redirectAddress"
                        value={popUpData.redirectAddress}
                        onChange={handleChange}
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.length > 0
                            ? categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))
                            : <option disabled>Kategori bulunamadı</option>}
                    </select>

                    <div
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>
                            {imageFile ? imageFile.name : "Kampanya görselini sürükleyin veya seçin"}
                        </p>
                        <input
                            type="file"
                            name="Image"
                            className="file-input"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSliderContentPopup;