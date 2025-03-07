import {useState} from 'react';

const AddOfferPopup = ({popupCloser}) => {
    const [popUpData, setPopUpData] = useState({
        Image: "",
        Title: "",
        Address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPopUpData({ ...popUpData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        popupCloser(false);

    };

    // if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2 className="mb-5">Kampanya Ekle</h2>
                <div className="form-group">
                    <div className="row justify-content-between align-items-center">
                        <label className="col-4">İsim:</label>
                        <input
                            type="text"
                            name="Title"
                            className="popup-inp col-8"
                            value={popUpData.Title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <label className="col-4">Şifre:</label>
                        <input
                            type="file"
                            name="Image"
                            className="col-8"
                            value={popUpData.Image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <label className="col-4">Ürün Kategorisi:</label>
                        <select
                            name="Address"
                            className="col-8"
                            value={popUpData.Address}
                            onChange={handleChange}
                            style={{ height: "40px",color: "black" }}
                        >
                            <option value="">Seçin</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                        </select>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <button type="button" onClick={()=>popupCloser(false)} className="add-btn col-4">
                            İptal
                        </button>
                        <button onClick={handleSubmit} className="add-btn col-4">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOfferPopup;
