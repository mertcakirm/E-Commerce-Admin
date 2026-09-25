import { useState } from "react";
import { FiX, FiPercent, FiCheckCircle } from "react-icons/fi";

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

    const handleQuickSelect = (rate) => {
        setDiscountValue(rate.toString());
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
                padding: "1rem"
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "460px",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    overflow: "hidden"
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        padding: "1.25rem 1.75rem",
                        borderBottom: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#ffffff"
                    }}
                >
                    <div className="d-flex align-items-center gap-3">
                        <div
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                backgroundColor: "#ecfdf5",
                                color: "#059669",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FiPercent size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                İndirim Uygula
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                Ürün için indirim oranı belirleyin.
                            </small>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => popupCloser(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                            e.currentTarget.style.color = "#0f172a";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#94a3b8";
                        }}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* BODY */}
                <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                        <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.88rem" }}>
                            <FiPercent size={16} className="text-success" /> İndirim Oranı (%) <span className="text-danger">*</span>
                        </label>
                        <div className="position-relative">
                            <input
                                type="number"
                                value={discountValue}
                                onChange={(e) => setDiscountValue(e.target.value)}
                                className="form-control"
                                placeholder="Örn: 15"
                                min="0"
                                max="100"
                                style={{
                                    borderRadius: "10px",
                                    padding: "10px 14px",
                                    fontSize: "0.95rem",
                                    boxShadow: "none",
                                    border: "1px solid #cbd5e1"
                                }}
                            />
                        </div>
                    </div>

                    {/* Hızlı Seçim Butonları */}
                    <div>
                        <small className="text-muted d-block mb-2" style={{ fontSize: "0.78rem" }}>
                            Hızlı Seçim
                        </small>
                        <div className="d-flex gap-2">
                            {[10, 20, 30, 50].map((rate) => (
                                <button
                                    key={rate}
                                    type="button"
                                    onClick={() => handleQuickSelect(rate)}
                                    style={{
                                        flex: 1,
                                        padding: "6px 0",
                                        borderRadius: "8px",
                                        border: discountValue === rate.toString() ? "1px solid #10b981" : "1px solid #e2e8f0",
                                        backgroundColor: discountValue === rate.toString() ? "#ecfdf5" : "#f8fafc",
                                        color: discountValue === rate.toString() ? "#059669" : "#475569",
                                        fontSize: "0.85rem",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    %{rate}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div
                    style={{
                        padding: "1.25rem 1.75rem",
                        borderTop: "1px solid #f1f5f9",
                        backgroundColor: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "12px"
                    }}
                >
                    <button
                        type="button"
                        onClick={() => popupCloser(false)}
                        style={{
                            background: "#ffffff",
                            border: "1px solid #cbd5e1",
                            padding: "9px 20px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#475569",
                            cursor: "pointer"
                        }}
                    >
                        Vazgeç
                    </button>
                    <button
                        type="button"
                        onClick={applyDiscount}
                        disabled={!id || discountValue === ""}
                        style={{
                            backgroundColor: (!id || discountValue === "") ? "#94a3b8" : "#059669",
                            border: "none",
                            padding: "9px 24px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            boxShadow: (!id || discountValue === "") ? "none" : "0 4px 14px rgba(5, 150, 105, 0.35)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: (!id || discountValue === "") ? "not-allowed" : "pointer"
                        }}
                    >
                        <FiCheckCircle size={16} />
                        İndirimi Uygula
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscountPopup;
