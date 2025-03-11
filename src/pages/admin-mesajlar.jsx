import { useState } from 'react';
import Admin_sidebar from '../components/admin-sidebar.jsx';
import './admin-css/admin-genel.css';
import ReplyMessagePopup from "../components/child/ReplyMessagePopup.jsx";
import ProcessPopup from "../components/child/processPopup.jsx";

const Admin_mesajlar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [messages] = useState([
    { email: 'furkangeren@gmail.com', subject: 'Üyelik İşlemleri', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, fuga quidem officia illum commodi maiores quis similique numquam nobis beatae, dignissimos eligendi omnis at aperiam impedit accusantium id nulla tenetur.', answered: true },
    { email: 'furkangeren@gmail.com', subject: 'Üyelik İşlemleri', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, fuga quidem officia illum commodi maiores quis similique numquam nobis beatae, dignissimos eligendi omnis at aperiam impedit accusantium id nulla tenetur.', answered: true },
    { email: 'furkangeren@gmail.com', subject: 'Üyelik İşlemleri', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, fuga quidem officia illum commodi maiores quis similique numquam nobis beatae, dignissimos eligendi omnis at aperiam impedit accusantium id nulla tenetur.', answered: false },
    { email: 'furkangeren@gmail.com', subject: 'Üyelik İşlemleri', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, fuga quidem officia illum commodi maiores quis similique numquam nobis beatae, dignissimos eligendi omnis at aperiam impedit accusantium id nulla tenetur.', answered: false },
    { email: 'furkangeren@gmail.com', subject: 'Üyelik İşlemleri', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, fuga quidem officia illum commodi maiores quis similique numquam nobis beatae, dignissimos eligendi omnis at aperiam impedit accusantium id nulla tenetur.', answered: true }
  ]);
  const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);

  const toggleProcessPopup = () => {
    setProcessIsPopupOpen(!isProcessPopupOpen);
  };
  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">Mesaj Listesi</div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">Müşteri E-Posta Adresi</th>
                <th scope="col">Konu</th>
                <th scope="col">Mesaj</th>
                <th scope="col">Cevaplandı mı?</th>
                <th scope="col">Cevapla</th>
              </tr>
              </thead>
              <tbody className='table-group-divider'>
              {currentMessages.map((message, index) => (
                  <tr key={index}>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td><p className='admin-mesajlar-mesaj'>{message.message}</p></td>
                    <td><span className='green'>{message.answered ? 'Evet' : 'Hayır'}</span></td>
                    <td style={{position:'relative',width:'200px'}}>
                      <div style={{display: 'flex',position:'absolute',width:'100%', height: '100%',alignItems: 'center',top:'0',left:'0'}}>
                        {message.answered ? '' : <button className='answer-message-btn ' onClick={togglePopup}>Mesajı Cevapla</button>}

                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
            <div className="row col-12 px-3 justify-content-between">
              <button className="tumunu-gor-btn-admin col-1" onClick={() => setCurrentPage(currentPage - 1)}>Geri</button>
              <button className="tumunu-gor-btn-admin col-1" onClick={() => setCurrentPage(currentPage + 1)}>İleri</button>
            </div>
          </div>
        </div>
      </div>
      {popupOpen && (
          <ReplyMessagePopup
              popupCloser={(b) => {
                if (b === false) setPopupOpen(b);
              }}
              id="1"
              processReady={(b)=>{
                if(b===true){
                  toggleProcessPopup();
                }
              }}
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

export default Admin_mesajlar;
