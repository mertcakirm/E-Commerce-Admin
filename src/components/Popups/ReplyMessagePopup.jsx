import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect, useState} from "react";
import {SendMessageAnswerRequest} from "../../API/MessagesApi.js";
import {toast} from "react-toastify";

const ReplyMessagePopup = ({popupCloser, id}) => {
    const [answerText, setAnswerText] = useState("");

    const handleSubmit = async () => {
        try {
            await SendMessageAnswerRequest(id, answerText);
            toast.success("Mesaj başarıyla gönderildi!");
        } catch (error) {
            console.error(error);
            toast.error("Mesaj gönderilemedi!");
        } finally {
            popupCloser(false);
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "600px"}}>
                <div className="popup-header">
                    <h2>Mesaj Gönder</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>

                <div className="form-group row row-gap-4 justify-content-around align-items-center mt-4">
                    <textarea
                        className="col-12 popup-inp"
                        style={{height: "200px", resize: "none"}}
                        placeholder="Mesaj cevabını yazınız..."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                    />

                    <div className="row justify-content-between align-items-center">
                        <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">
                            Mesajı Gönder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyMessagePopup;