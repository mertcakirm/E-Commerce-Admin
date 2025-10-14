import { useState } from "react";

const DiscountPopup = ({ popupCloser, id, toggleProcess }) => {
    const [discountValue, setDiscountValue] = useState("");

    const applyDiscount = () => {
        if (!id || discountValue === "") return;
        toggleProcess({
            text: "Bu ürüne indirim uygulamak istiyor musunuz?",
            type: "product_discount",
            id: id,
            extraData: discountValue,
        });
        popupCloser(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in">
                <div className="model-header">
                    <h3>İndirim Uygula</h3>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>

                <div className="row mt-3" style={{ rowGap: '20px' }}>
                    <div className="col-12">
                        <label className="form-label fw-semibold">İndirim Oranı (%)</label>
                        <input
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            className="form-control"
                            placeholder="Örneğin: 10"
                            min="0"
                            max="100"
                        />
                    </div>

                    <div className="col-12 d-flex justify-content-end mt-3">
                        <button
                            onClick={applyDiscount}
                            className="btn btn-success px-4"
                        >
                            Uygula
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountPopup;