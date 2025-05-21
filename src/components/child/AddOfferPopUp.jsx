import {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AddOfferPopup = ({popupCloser}) => {
    const [popUpData, setPopUpData] = useState({
        Image: "",
        Title: "",
        Address: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPopUpData({...popUpData, [name]: value});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPopUpData({...popUpData, Image: file.name});
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setImageFile(file);
            setPopUpData({...popUpData, Image: file.name});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        popupCloser(false);
    };

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "600px"}}>
                <div className="popup-header">
                    <h2>Kampanya Ekle</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>
                <div className="form-group row row-gap-4  justify-content-around align-items-center mt-4">
                    <input
                        type="text"
                        name="Title"
                        className="popup-inp col-5"
                        placeholder="Kampanya Başlığı"
                        value={popUpData.Title}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="Address"
                        className="col-5"
                        value={popUpData.Address}
                        onChange={handleChange}
                        style={{height: "50px", color: "black"}}
                    >
                        <option value="">Kampanya Kategorisi Seçin</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>

                    {/* Sürükle Bırak Alanı */}
                    <div
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="purple"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/>
                            </svg>
                            {imageFile ? imageFile.name : " Kampanya görselini buraya sürükleyin veya yükleyin"}</p>
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

export default AddOfferPopup;
