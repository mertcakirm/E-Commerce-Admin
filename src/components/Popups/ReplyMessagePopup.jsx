import { useState } from "react";
import { SendMessageAnswerRequest } from "../../API/MessagesApi.js";
import { toast } from "react-toastify";
import { FiX, FiMail, FiSend, FiMessageSquare } from "react-icons/fi";

const ReplyMessagePopup = ({ popupCloser, id }) => {
    const [answerText, setAnswerText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!answerText.trim()) {
            toast.warn("Lütfen gönderilecek yanıt mesajını yazınız!");
            return;
        }

        setIsSubmitting(true);
        try {
            await SendMessageAnswerRequest(id, answerText.trim());
            toast.success("Mesaj başarıyla gönderildi!");
            popupCloser(false);
        } catch (error) {
            console.error("Mesaj yanıt hatası:", error);
            toast.error("Mesaj gönderilemedi, lütfen tekrar deneyin!");
        } finally {
            setIsSubmitting(false);
        }
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
                    maxWidth: "580px",
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
                        padding: "1.25rem 2rem",
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
                            <FiMail size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                Mesajı Yanıtla
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                {id ? `ID: #${id} numaralı müşteri talebine dönüş yapıyorsunuz.` : "Kullanıcıya doğrudan e-posta/mesaj yanıtı iletin."}
                            </small>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => popupCloser(false)}
                        disabled={isSubmitting}
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
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                            e.currentTarget.style.color = "#0f172a";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#94a3b8";
                        }}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* BODY */}
                <div style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 m-0" style={{ fontSize: "0.88rem" }}>
                                <FiMessageSquare size={16} className="text-primary" /> Cevap Metni <span className="text-danger">*</span>
                            </label>
                            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                                {answerText.length} karakter
                            </small>
                        </div>
                        <textarea
                            className="form-control"
                            style={{
                                height: "180px",
                                resize: "none",
                                borderRadius: "12px",
                                padding: "14px",
                                fontSize: "0.92rem",
                                lineHeight: "1.5",
                                border: "1px solid #cbd5e1",
                                boxShadow: "none"
                            }}
                            placeholder="Müşteriye iletilecek açıklama veya çözüm yanıtını buraya girin..."
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                        />
                    </div>
                </div>

                {/* FOOTER */}
                <div
                    style={{
                        padding: "1.25rem 2rem",
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
                        disabled={isSubmitting}
                        style={{
                            background: "#ffffff",
                            border: "1px solid #cbd5e1",
                            padding: "9px 20px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#475569",
                            cursor: isSubmitting ? "not-allowed" : "pointer"
                        }}
                    >
                        Vazgeç
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !answerText.trim()}
                        style={{
                            backgroundColor: (!answerText.trim() || isSubmitting) ? "#94a3b8" : "#2563eb",
                            border: "none",
                            padding: "9px 24px",
                            borderRadius: "10px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            boxShadow: (!answerText.trim() || isSubmitting) ? "none" : "0 4px 14px rgba(37, 99, 235, 0.35)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: (!answerText.trim() || isSubmitting) ? "not-allowed" : "pointer"
                        }}
                    >
                        <FiSend size={16} />
                        {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReplyMessagePopup;
