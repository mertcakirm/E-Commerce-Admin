import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import {AnswerQuestionRequest, GetProductQuestionsRequest} from "../API/ProductApi.js";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [proccessState, setProcessState] = useState({
        text: "",
        type: "",
        id: null,
        discount: null
    });
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        AOS.init({duration: 500});
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await GetProductQuestionsRequest();
            setQuestions(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAnswerChange = (id, value) => {
        setAnswers(prev => ({...prev, [id]: value}));
    };

    const handleAnswerSubmit = async (id) => {
        const answerText = answers[id];
        if (!answerText || answerText.trim() === "") {
            toast.warning("Lütfen bir cevap girin.");
            return;
        }

        const dto = {
            questionId: id,
            answerText: answerText
        };

        try {
            await AnswerQuestionRequest(dto);
            toast.success("Cevap gönderildi!");
            fetchQuestions();
        } catch (err) {
            console.error(err);
            toast.error("Cevap gönderilemedi.");
        }
    };

    const handleDeleteQuestion = (id) => {
        setProcessState({
            text: "Bu soruyu silmek istediğinize emin misiniz?",
            type: "question_delete",
            id: id,
            discount: null
        });
        setProcessIsPopupOpen(true);
    };

    return (
        <div className="admin-sag-container" data-aos="fade-in">
            <div className="row">
                <h3 className="col-12 mb-4">Soru Listesi</h3>
                {questions.length === 0 ? (
                    <p className="text-center">Henüz soru bulunamadı.</p>
                ) : (
                    questions.map((q) => (
                        <div
                            key={q.id}
                            className="col-10 col-md-6 mb-4 p-4 "
                            data-aos="fade-up"
                        >
                            <div className="border rounded p-4 h-100 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="fw-bold mb-1">
                                        {q.productName} {`(${q.productId})`}
                                    </p>
                                    <div className="d-flex gap-2 flex-column">
                                        <small className="text-muted">
                                            {new Date(q.createdDate).toLocaleString("tr-TR")}
                                        </small>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteQuestion(q.id)}
                                        >
                                            Sil
                                        </button>
                                    </div>


                                </div>

                                <p className="mb-2">Soran: {q.userName}</p>
                                <p className="mb-3" style={{width:'200px', textWrap:'wrap', wordBreak:'break-all'}}>
                                    {q.questionText}
                                </p>

                                {q.isCorrect ? (
                                    <p className="text-success fw-bold">Bu soru cevaplandı ✅</p>
                                ) : (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Cevabınızı yazın..."
                                            className="form-control mb-2"
                                            value={answers[q.id] || ""}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        />
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleAnswerSubmit(q.id)}
                                        >
                                            Cevapla
                                        </button>

                                    </div>
                                )}
                            </div>
                            </div>

                    ))
                )}
            </div>
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        if(b === false){
                            setProcessIsPopupOpen(b);
                            setRefresh(!refresh);
                        }
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