import { useState } from "react";

const UpdateOrderPopup = ({ popupCloser, id, toggleProcess }) => {
    const [selectedStatus, setSelectedStatus] = useState("");

    const applyStatusUpdate = () => {
        if (!id || selectedStatus === "") return;
        toggleProcess({
            text: "Sipariş durumu güncellensin mi?",
            acceptedText: "Sipariş durumu güncellendi",
            type: "update_order",
            id: id,
            discount: selectedStatus, // mevcut yapıdaki 'discount' parametresine gönderiliyor
        });
        popupCloser(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in">
                <div className="model-header">
                    <h3>Sipariş Durumu Güncelle</h3>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>

                <div className="row mt-3" style={{ rowGap: "20px" }}>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Yeni Sipariş Durumu</label>
                        <select
                            className="form-select"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">Seçim Yapın</option>
                            <option value="Onaylandı">Onaylandı</option>
                            <option value="Hazırlanıyor">Hazırlanıyor</option>
                            <option value="Yolda">Yolda</option>
                        </select>
                    </div>

                    <div className="col-12 d-flex justify-content-end mt-3">
                        <button onClick={applyStatusUpdate} className="btn btn-success px-4">
                            Güncelle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderPopup;