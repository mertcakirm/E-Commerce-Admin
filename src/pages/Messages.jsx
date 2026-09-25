import { useEffect, useState } from 'react';
import './css/General.css';
import ReplyMessagePopup from "../components/Popups/ReplyMessagePopup.jsx";
import Pagination from "../components/Other/Pagination.jsx";
import { GetMessagesRequest } from "../API/MessagesApi.js";
import { 
    FiMail, 
    FiCheckCircle, 
    FiClock, 
    FiSend, 
    FiMessageSquare, 
    FiCornerDownRight 
} from "react-icons/fi";

const Messages = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const togglePopup = (id) => {
        setSelectedMessageId(id);
        setPopupOpen(true);
    };

    const GetMessages = async () => {
        try {
            setLoading(true);
            const response = await GetMessagesRequest(currentPage);
            setMessages(response?.data?.items || []);
            setLastPage(response?.data?.totalPages || 1);
        } catch (error) {
            console.error("Mesajlar alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetMessages();
    }, [currentPage, refresh]);

    return (
        <div className="admin-sag-container">
            {/* ÜST BAŞLIK ALANI */}
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FiMail size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Müşteri Mesajları
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            İletişim formu üzerinden gelen kullanıcı soru ve talepleri
                        </small>
                    </div>
                </div>
            </div>

            {/* TABLO KARTI */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                    padding: "1.25rem",
                    overflow: "hidden"
                }}
            >
                <div className="table-responsive p-0 m-0 border-0">
                    <table className="table align-middle m-0 table-hover">
                        <thead style={{ backgroundColor: "#f8fafc" }}>
                            <tr style={{ fontSize: "0.78rem", borderBottom: "1px solid #e2e8f0" }}>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "200px" }}>Müşteri</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "160px" }}>Konu</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "260px" }}>Mesaj İçeriği</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "130px" }}>Durum</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ minWidth: "200px" }}>Yanıt / Aksiyon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        Mesajlar yükleniyor...
                                    </td>
                                </tr>
                            ) : messages && messages.length > 0 ? (
                                messages.map((message) => {
                                    const isAnswered = Boolean(message.isReply);
                                    return (
                                        <tr key={message.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                            {/* Müşteri E-Posta */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius: "8px",
                                                            backgroundColor: isAnswered ? "#f1f5f9" : "#eff6ff",
                                                            color: isAnswered ? "#64748b" : "#2563eb",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        <FiMail size={16} />
                                                    </div>
                                                    <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: "200px" }} title={message.userEmail}>
                                                        {message.userEmail}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Konu */}
                                            <td className="px-3 fw-medium text-dark">
                                                <span className="text-truncate d-block" style={{ maxWidth: "160px" }} title={message.messageTitle}>
                                                    {message.messageTitle || "Konu Belirtilmemiş"}
                                                </span>
                                            </td>

                                            {/* Mesaj İçeriği */}
                                            <td className="px-3 py-3">
                                                <p 
                                                    className="m-0 text-secondary" 
                                                    style={{ 
                                                        fontSize: "0.85rem", 
                                                        lineHeight: "1.45",
                                                        maxHeight: "68px",
                                                        overflowY: "auto",
                                                        wordBreak: "break-word"
                                                    }}
                                                >
                                                    {message.messageText}
                                                </p>
                                            </td>

                                            {/* Durum Rozeti */}
                                            <td className="px-3 text-center">
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        backgroundColor: isAnswered ? "#ecfdf5" : "#fffbeb",
                                                        color: isAnswered ? "#059669" : "#d97706",
                                                        border: `1px solid ${isAnswered ? "#a7f3d0" : "#fde68a"}`,
                                                        borderRadius: "999px",
                                                        padding: "4px 10px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {isAnswered ? <FiCheckCircle size={13} /> : <FiClock size={13} />}
                                                    {isAnswered ? "Cevaplandı" : "Beklemede"}
                                                </span>
                                            </td>

                                            {/* Yanıt / Aksiyon Butonu */}
                                            <td className="px-3 text-end">
                                                {isAnswered ? (
                                                    <div 
                                                        className="d-inline-flex align-items-center gap-1.5 text-secondary text-truncate"
                                                        style={{ 
                                                            fontSize: "0.8rem", 
                                                            maxWidth: "240px",
                                                            backgroundColor: "#f8fafc",
                                                            padding: "6px 12px",
                                                            borderRadius: "8px",
                                                            border: "1px solid #e2e8f0"
                                                        }}
                                                        title={message.answer}
                                                    >
                                                        <FiCornerDownRight size={13} className="text-primary flex-shrink-0" />
                                                        <span className="text-truncate">{message.answer}</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePopup(message.id)}
                                                        style={{
                                                            backgroundColor: "#2563eb",
                                                            border: "none",
                                                            color: "#ffffff",
                                                            borderRadius: "8px",
                                                            padding: "7px 14px",
                                                            fontSize: "0.82rem",
                                                            fontWeight: 600,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "6px",
                                                            cursor: "pointer",
                                                            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                                                            transition: "background-color 0.15s ease"
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                                                    >
                                                        <FiSend size={13} />
                                                        Mesajı Cevapla
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <FiMessageSquare size={32} className="text-slate-300 mb-2" />
                                            <span>Gelen müşteri mesajı bulunmuyor.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SAYFALAMA */}
                {messages.length > 0 && (
                    <div className="pt-3 border-top mt-3">
                        <Pagination
                            pageNum={currentPage}
                            setPageNum={setCurrentPage}
                            lastPage={lastPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />
                    </div>
                )}
            </div>

            {/* YANIT POPUP */}
            {popupOpen && (
                <ReplyMessagePopup
                    popupCloser={(state) => {
                        setPopupOpen(state);
                        if (!state) setRefresh(prev => !prev);
                    }}
                    id={selectedMessageId}
                />
            )}
        </div>
    );
};

export default Messages;
