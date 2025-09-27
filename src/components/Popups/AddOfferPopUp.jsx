import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import {CreateOfferRequest} from "../../API/OfferApi.js";

const AddOfferPopup = ({ popupCloser }) => {
    const [popUpData, setPopUpData] = useState({
        Title: "",
        Description: "",
        StartDate: "",
        EndDate: "",
        DiscountRate: 0,
    });

    const [imageFile, setImageFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPopUpData({ ...popUpData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
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
        }
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            toast.error("Lütfen bir görsel yükleyin!");
            return;
        }

        const formData = new FormData();
        formData.append("Name", popUpData.Title);
        formData.append("Description", popUpData.Description);
        formData.append("StartDate", popUpData.StartDate);
        formData.append("EndDate", popUpData.EndDate);
        formData.append("DiscountRate", popUpData.DiscountRate);
        formData.append("ImageFile", imageFile);

        try {
            const response = await CreateOfferRequest(formData);
            if (response.status === 200 || response.status === 201) {
                toast.success("Kampanya başarıyla oluşturuldu!");
                popupCloser(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Kampanya oluşturulurken bir hata oluştu.");
        }
    };

    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{ width: "600px" }}>
                <div className="popup-header">
                    <h2>Kampanya Ekle</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>
                <div className="form-group row row-gap-4 justify-content-around align-items-center mt-4">
                    <div className="col-6">
                        <input
                            type="text"
                            name="Title"
                            className="popup-inp w-100"
                            placeholder="Kampanya Başlığı"
                            value={popUpData.Title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="number"
                            name="DiscountRate"
                            className="popup-inp w-100"
                            placeholder="Kampanya İndirim Oranı"
                            value={popUpData.DiscountRate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="datetime-local"
                            name="StartDate"
                            className="popup-inp w-100"
                            value={popUpData.StartDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="datetime-local"
                            name="EndDate"
                            className="popup-inp w-100"
                            value={popUpData.EndDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            name="Description"
                            className="popup-inp w-100"
                            placeholder="Kampanya Açıklaması"
                            value={popUpData.Description}
                            onChange={handleChange}
                            required
                        />
                    </div>




                    <div className="col-12">
                        <div
                            className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <p>
                                {imageFile ? imageFile.name : "Kampanya görselini buraya sürükleyin veya yükleyin"}
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
                    </div>



                    <div className="row justify-content-between align-items-center mt-3">
                        <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">
                            Kampanya Oluştur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOfferPopup;