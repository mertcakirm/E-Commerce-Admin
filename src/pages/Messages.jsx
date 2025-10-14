import {useEffect, useState} from 'react';
import './css/General.css';
import ReplyMessagePopup from "../components/Popups/ReplyMessagePopup.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Other/Pagination.jsx";
import {GetMessagesRequest} from "../API/MessagesApi.js";

const Messages = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [lastPage, setLastPage] = useState(0);
    const [messages, setMessages] = useState([]);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [refreh, setRefreh] = useState(false);

    const togglePopup = async (id) => {
        await setSelectedMessageId(id);
        setPopupOpen(!popupOpen);
    };

    const GetMessages = async () => {
        const response = await GetMessagesRequest(currentPage);
        setMessages(response.data.items);
        setLastPage(response.data.totalPages);
    }

    useEffect(() => {
        GetMessages();
        AOS.init({duration: 500});
    }, []);

    useEffect(() => {
        GetMessages();
    }, [refreh]);


    return (
        <div>
            <div className="admin-sag-container">
                <div className="row admin-genel-row" data-aos="fade-in">
                    <div className="col-12 alt-basliklar-admin">Mesaj Listesi</div>
                    <div className="table-responsive">
                        <table className="table ">
                            <thead>
                                <tr className="border-0">
                                    <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Müşteri E-Posta Adresi</th>
                                    <th className="border-0">Konu</th>
                                    <th className="border-0">Mesaj</th>
                                    <th className="border-0">Cevaplandı mı?</th>
                                    <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>Cevap</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages && messages.length > 0 ? (
                                    messages.map((message) => (
                                        <tr key={message.id}>
                                            <td>{message.userEmail}</td>
                                            <td>{message.messageTitle}</td>
                                            <td><p className='admin-mesajlar-mesaj'>{message.messageText}</p></td>
                                            <td><span className='green'>{message.isReply ? 'Evet' : 'Hayır'}</span></td>
                                            <td style={{position: 'relative', width: '200px'}}>
                                                <div style={{
                                                    display: 'flex',
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    alignItems: 'center',
                                                    top: '0',
                                                    left: '0'
                                                }}>
                                                    {message.isReply ? <div className="text-center admin-mesajlar-mesaj">{message.answer}</div> :
                                                        <button className='answer-message-btn ' onClick={()=>togglePopup(message.id)}>Mesajı
                                                            Cevapla</button>}

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted py-3">
                                            Henüz mesajınız bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {messages.length > 0 ? (
                            <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage={lastPage}/>
                        ):null}

                    </div>
                </div>
            </div>
            {popupOpen && (
                <ReplyMessagePopup
                    popupCloser={(b) => {
                        if (b === false) {
                            setPopupOpen(b);
                            setRefreh(!refreh);
                        }}
                    }
                    id={selectedMessageId}
                />
            )}

            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessIsPopupOpen(b);
                    }}
                    text="Mesaj gönderilsin mi?"
                    acceptedText="Mesajınız gönderildi"
                    type="offer_delete"
                    id="1"
                />
            )}
        </div>
    );
}

export default Messages;
