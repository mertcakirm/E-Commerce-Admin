import React, {useState} from 'react';

const AddOfferPopup = () => {
    const [userData, setUserData] = useState({
        Username: "",
        Password: "",
        RoleId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        AddUserReq(userData)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Kullanıcı Ekle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>İsim:</label>
                        <input
                            type="text"
                            name="Username"
                            value={userData.Username}
                            style={{ height: "40px",color: "black" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Şifre:</label>
                        <input
                            type="password"
                            name="Password"
                            value={userData.Password}
                            style={{ height: "40px",color: "black" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <select
                            name="RoleId"
                            value={userData.RoleId}
                            onChange={handleChange}
                            style={{ height: "40px",color: "black" }}
                        >
                            <option value="">Seçin</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="add-btn" onClick={onClose}>
                            İptal
                        </button>
                        <button type="submit" className="add-btn">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOfferPopup;
