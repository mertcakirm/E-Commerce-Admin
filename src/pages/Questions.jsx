import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AnswerQuestionRequest, GetProductQuestionsRequest } from "../API/ProductApi.js";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import { 
    FiHelpCircle, 
    FiUser, 
    FiCalendar, 
    FiCheckCircle, 
    FiClock, 
    FiTrash2, 
    FiSend, 
    FiPackage, 
    FiMessageSquare 
} from "react-icons/fi";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittingId, setSubmittingId] = useState(null);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [proccessState, setProcessState] = useState({
        text: "",
        type: "",
        id: null,
        discount: null
    });
    const [refresh, setRefresh] = useState(false);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const res = await GetProductQuestionsRequest();
            setQuestions(res?.data || []);
        } catch (err) {
            console.error("Sorular getirilemedi:", err);
            toast.error("Ürün soruları yüklenirken bir sorun oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [refresh]);

    const handleAnswerChange = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleAnswerSubmit = async (id) => {
        const answerText = answers[id];
        if (!answerText || !answerText.trim()) {
            toast.warning("Lütfen bir cevap yazın.");
            return;
        }

        const dto = {
            questionId: id,
            answerText: answerText.trim()
        };

        try {
            setSubmittingId(id);
            await AnswerQuestionRequest(dto);
            toast.success("Cevabınız başarıyla iletildi!");
            setAnswers(prev => ({ ...prev, [id]: "" }));
            fetchQuestions();
        } catch (err) {
            console.error(err);
            toast.error("Cevap gönderilemedi.");
        } finally {
            setSubmittingId(null);
        }
    };

    const handleDeleteQuestion = (id, productName) => {
        setProcessState({
            text: `"${productName || 'Seçili'}" ürününe ait bu soruyu silmek istediğinize emin misiniz?`,
            type: "question_delete",
            id: id,
            discount: null
        });
        setProcessIsPopupOpen(true);
    };

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
                        <FiHelpCircle size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Ürün Soruları & Yanıtları
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Müşterilerin ürün sayfalarından yönelttiği sorular ve yanıtlama paneli
                        </small>
                    </div>
                </div>
            </div>

            {/* SORU LİSTESİ GRID ALANI */}
            {loading && questions.length === 0 ? (
                <div className="d-flex justify-content-center py-5 text-muted">
                    Sorular yükleniyor...
                </div>
            ) : questions.length === 0 ? (
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        padding: "3.5rem 1.5rem",
                        textAlign: "center"
                    }}
                >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <FiHelpCircle size={36} className="text-muted mb-2" />
                        <span className="fw-semibold text-dark">Henüz iletilen bir ürün sorusu bulunmuyor.</span>
                        <small className="text-secondary">Yeni sorular geldikçe burada listelenecektir.</small>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {questions.map((q) => {
                        const isAnswered = Boolean(q.isCorrect);
                        return (
                            <div key={q.id} className="col-12 col-lg-6">
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "16px",
                                        border: "1px solid rgba(0, 0, 0, 0.06)",
                                        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                                        padding: "1.5rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        justifyContent: "space-between",
                                        transition: "transform 0.15s ease, box-shadow 0.15s ease"
                                    }}
                                >
                                    {/* KART BAŞLIĞI: Ürün Bilgisi, Durum & Sil Butonu */}
                                    <div>
                                        <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                                            <div>
                                                <div className="d-flex align-items-center gap-1.5 mb-1">
                                                    <FiPackage size={14} className="text-primary flex-shrink-0" />
                                                    <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                                                        {q.productName || "Ürün Adı Belirtilmemiş"}
                                                    </span>
                                                    <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: "0.72rem" }}>
                                                        #{q.productId}
                                                    </span>
                                                </div>

                                                <div className="d-flex flex-wrap align-items-center gap-3 text-secondary" style={{ fontSize: "0.78rem" }}>
                                                    <span className="d-flex align-items-center gap-1">
                                                        <FiUser size={12} className="text-muted" />
                                                        {q.userName || "Anonim Müşteri"}
                                                    </span>
                                                    <span className="d-flex align-items-center gap-1">
                                                        <FiCalendar size={12} className="text-muted" />
                                                        {q.createdDate ? new Date(q.createdDate).toLocaleString("tr-TR", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        }) : "-"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                {/* Durum Rozeti */}
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                        backgroundColor: isAnswered ? "#ecfdf5" : "#fffbeb",
                                                        color: isAnswered ? "#059669" : "#d97706",
                                                        border: `1px solid ${isAnswered ? "#a7f3d0" : "#fde68a"}`,
                                                        borderRadius: "999px",
                                                        padding: "3px 9px",
                                                        fontSize: "0.74rem",
                                                        fontWeight: 600,
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    {isAnswered ? <FiCheckCircle size={12} /> : <FiClock size={12} />}
                                                    {isAnswered ? "Cevaplandı" : "Beklemede"}
                                                </span>

                                                {/* Silme Butonu */}
                                                <button
                                                    type="button"
                                                    title="Soruyu Sil"
                                                    onClick={() => handleDeleteQuestion(q.id, q.productName)}
                                                    style={{
                                                        backgroundColor: "#fef2f2",
                                                        border: "1px solid #fee2e2",
                                                        color: "#ef4444",
                                                        borderRadius: "8px",
                                                        width: "32px",
                                                        height: "32px",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        transition: "all 0.15s ease"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#ef4444";
                                                        e.currentTarget.style.color = "#ffffff";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#fef2f2";
                                                        e.currentTarget.style.color = "#ef4444";
                                                    }}
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Soru Metni */}
                                        <div
                                            style={{
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #e2e8f0",
                                                borderRadius: "12px",
                                                padding: "0.85rem 1rem",
                                                marginBottom: "1rem"
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-1.5 text-muted mb-1" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                                                <FiMessageSquare size={13} className="text-primary" /> Müşteri Sorusu:
                                            </div>
                                            <p className="m-0 text-dark fw-medium" style={{ fontSize: "0.88rem", lineHeight: "1.45", wordBreak: "break-word" }}>
                                                {q.questionText}
                                            </p>
                                        </div>
                                    </div>

                                    {/* KART ALTI: Cevap Durumu veya Yanıtlama Alanı */}
                                    <div>
                                        {isAnswered ? (
                                            <div
                                                style={{
                                                    backgroundColor: "#f0fdf4",
                                                    border: "1px solid #bbf7d0",
                                                    borderRadius: "10px",
                                                    padding: "0.75rem 1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px"
                                                }}
                                            >
                                                <FiCheckCircle size={16} className="text-success flex-shrink-0" />
                                                <span className="text-success fw-semibold" style={{ fontSize: "0.84rem" }}>
                                                    Bu soru yanıtlandı ve sitede yayında.
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="d-flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Müşteriye iletilecek cevabı yazın..."
                                                    className="form-control"
                                                    value={answers[q.id] || ""}
                                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") handleAnswerSubmit(q.id);
                                                    }}
                                                    style={{
                                                        borderRadius: "10px",
                                                        fontSize: "0.88rem",
                                                        padding: "8px 12px",
                                                        border: "1px solid #cbd5e1",
                                                        boxShadow: "none"
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    disabled={submittingId === q.id}
                                                    onClick={() => handleAnswerSubmit(q.id)}
                                                    style={{
                                                        backgroundColor: "#2563eb",
                                                        border: "none",
                                                        color: "#ffffff",
                                                        borderRadius: "10px",
                                                        padding: "8px 16px",
                                                        fontSize: "0.85rem",
                                                        fontWeight: 600,
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        cursor: submittingId === q.id ? "not-allowed" : "pointer",
                                                        whiteSpace: "nowrap",
                                                        boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                                                        transition: "all 0.15s ease"
                                                    }}
                                                    onMouseEnter={(e) => !submittingId && (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                                                    onMouseLeave={(e) => !submittingId && (e.currentTarget.style.backgroundColor = "#2563eb")}
                                                >
                                                    <FiSend size={14} />
                                                    {submittingId === q.id ? "Gönderiliyor..." : "Cevapla"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ONAY POPUP */}
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        setProcessIsPopupOpen(b);
                        if (!b) setRefresh(prev => !prev);
                    }}
                    text={proccessState.text}
                    type={proccessState.type}
                    id={proccessState.id}
                    discount={proccessState.discount}
                />
            )}
        </div>
    );
};

export default Questions;
