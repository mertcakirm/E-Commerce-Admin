import {useEffect, useState} from "react";
import {addSlider} from "../../API/sayfalarapi.js";
import {categoryDropdown} from "../../API/kategoriapi.js";
import AOS from "aos";
import "aos/dist/aos.css";

const AddSliderContentPopup = ({popupCloser}) => {
    const [sliderImage, setSliderImage] = useState(""); // Resim dosyasını string olarak tutacak
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([]);
    const [popUpData, setPopUpData] = useState({
        topTitle: "",
        middleTitle: "",
        underTitle: "",
        redirectAddress: "",
        image: "",
    });
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPopUpData({...popUpData, [name]: value});
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.onerror = () => reject(new Error("File read error"));
            reader.readAsDataURL(file);
        });
    };

    const fetchCategory = async () => {
        const data = await categoryDropdown();
        setCategories(data || []);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const base64 = await convertImageToBase64(file); // Resmi base64 formatına çevir
            setSliderImage(base64); // Base64'i state'e kaydet
            setPopUpData({...popUpData, image: file.name});
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            const base64 = await convertImageToBase64(file); // Resmi base64 formatına çevir
            setSliderImage(base64); // Base64'i state'e kaydet
            setPopUpData({...popUpData, image: file.name});
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const sliderDTO = {
        image: {bytes: sliderImage},
        topTitle: popUpData.topTitle,
        middleTitle: popUpData.middleTitle,
        underTitle: popUpData.underTitle,
        category: popUpData.redirectAddress,
    };

    useEffect(() => {
        AOS.init({duration: 500});
        fetchCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addSlider(sliderDTO);
        } catch (error) {
            console.error("Request error: ", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "600px"}}>
                <div className="popup-header">
                    <h2>Slider Ekle</h2>
                    <button
                        className="popup-close-btn"
                        onClick={() => popupCloser(false)}
                    >
                        &times;
                    </button>
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
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))
                        ) : (
                            <option disabled>Kategori bulunamadı</option>
                        )}
                    </select>

                    <div
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="purple"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/>
                            </svg>
                            {imageFile ? imageFile.name : " Kampanya görselini buraya sürükleyin veya yükleyin"}
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

                    <div className="row justify-content-between align-items-center">
                        <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSliderContentPopup;
