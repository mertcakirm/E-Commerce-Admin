import { useState } from "react";
import { FiX, FiTruck, FiCheckCircle, FiPackage, FiClock } from "react-icons/fi";

const STATUS_OPTIONS = [
    { value: "Onaylandı", label: "Onaylandı", icon: FiCheckCircle, color: "#16a34a", bg: "#dcfce7", border: "#bbf7d0" },
    { value: "Hazırlanıyor", label: "Hazırlanıyor", icon: FiPackage, color: "#d97706", bg: "#fef3c7", border: "#fde68a" },
    { value: "Yolda", label: "Yolda", icon: FiTruck, color: "#2563eb", bg: "#dbeafe", border: "#bfdbfe" },
];

const UpdateOrderPopup = ({ popupCloser, id, toggleProcess }) => {
    const [selectedStatus, setSelectedStatus] = useState("");

    const applyStatusUpdate = () => {
        if (!id || selectedStatus === "") return;
        toggleProcess({
            text: "Sipariş durumu güncellensin mi?",
            acceptedText: "Sipariş durumu güncellendi",
            type: "update_order",
            id: id,
            discount: selectedStatus,
        });
        popupCloser(false);
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
                    maxWidth: "480px",
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
                                backgroundColor: "#eff6ff",
                                color: "#2563eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FiTruck size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                Sipariş Durumu Güncelle
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                {id ? `ID: #${id} numaralı siparişin aşamasını değiştirin.` : "Sipariş aşamasını güncelleyin."}
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
                            <FiClock size={16} className="text-primary" /> Yeni Durum <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            style={{
                                borderRadius: "10px",
                                padding: "10px 14px",
                                fontSize: "0.92rem",
                                boxShadow: "none",
                                border: "1px solid #cbd5e1"
                            }}
                        >
                            <option value="">Aşama Seçiniz...</option>
                            <option value="Onaylandı">Onaylandı</option>
                            <option value="Hazırlanıyor">Hazırlanıyor</option>
                            <option value="Yolda">Yolda</option>
                        </select>
                    </div>

                    {/* Hızlı Seçim Kartları */}
                    <div>
                        <small className="text-muted d-block mb-2" style={{ fontSize: "0.78rem" }}>
                            Hızlı Aşama Seçimi
                        </small>
                        <div className="d-flex flex-column gap-2">
                            {STATUS_OPTIONS.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected = selectedStatus === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setSelectedStatus(opt.value)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "10px 14px",
                                            borderRadius: "10px",
                                            border: isSelected ? `2px solid ${opt.color}` : "1px solid #e2e8f0",
                                            backgroundColor: isSelected ? opt.bg : "#ffffff",
                                            cursor: "pointer",
                                            transition: "all 0.15s ease",
                                            textAlign: "left"
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-2.5">
                                            <div
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "8px",
                                                    backgroundColor: opt.bg,
                                                    color: opt.color,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <Icon size={16} />
                                            </div>
                                            <span style={{ fontSize: "0.9rem", fontWeight: isSelected ? 700 : 500, color: "#1e293b" }}>
                                                {opt.label}
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <FiCheckCircle size={18} style={{ color: opt.color }} />
                                        )}
                                    </button>
                                );
                            })}
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
                        onClick={applyStatusUpdate}
                        disabled={!id || selectedStatus === ""}
                        style={{
                            backgroundColor: (!id || selectedStatus === "") ? "#94a3b8" : "#2563eb",
                            border: "none",
                            padding: "9px 24px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            boxShadow: (!id || selectedStatus === "") ? "none" : "0 4px 14px rgba(37, 99, 235, 0.35)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: (!id || selectedStatus === "") ? "not-allowed" : "pointer"
                        }}
                    >
                        <FiCheckCircle size={16} />
                        Durumu Güncelle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderPopup;
