import { useState } from 'react';
import Admin_sidebar from '../components/admin-sidebar.jsx';
import './admin-css/admin-genel.css';
import ProcessPopup from "../components/child/processPopup.jsx";
import LastOrdersPopup from "../components/child/LastOrdersPopup.jsx";

const Admin_aktif_siparis = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
  const [isLastOrdersPopupOpen, setLastOrdersIsPopupOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 1, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 2, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 3, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 4, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: false, status: 'Hazırlanıyor' },
    { id: 5, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 5, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' }
  ]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

//  const paginate = (pageNumber) => setCurrentPage(pageNumber);

//  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const toggleProcessPopup = () => {
    setProcessIsPopupOpen(!isProcessPopupOpen);
  };

  const toggleLastOrdersPopup = () => {
    setLastOrdersIsPopupOpen(!isLastOrdersPopupOpen);
  };
  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
            <div className="col-12 row justify-content-between align-items-center">
              <p className="alt-basliklar-admin col-6">Aktif Sipariş Listesi</p>
              <button className="tumunu-gor-btn-admin col-2" onClick={toggleLastOrdersPopup}>Geçmiş Siparişler</button>
            </div>
          <div className="table-responsive">
            <table className="table mt-3 table-striped">
              <thead>
              <tr>
                <th scope="col">Ürün Kodu</th>
                <th scope="col">Müşteri Ad Soyad</th>
                <th scope="col">Müşteri Adres</th>
                <th scope="col">Müşteri Telefon Numarası</th>
                <th scope="col">Ödeme Alındı mı?</th>
                <th scope="col">Sipariş Durumu</th>
              </tr>
              </thead>
              <tbody>
              {currentOrders.map(order => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.name}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td><span className='green' style={{fontWeight: '600'}}>{order.payment ? 'Evet' : 'Hayır'}</span>
                    </td>
                    <td style={{width:'400px'}} className="row justify-content-center align-items-center">
                      <p className="col-12">Şuanki sipariş durumu: <span className='green'>{order.status}</span></p>
                      <select className="col-6" style={{marginRight: '5px'}} name="siparis-durumu-admin" id="siparis-durumu-admin">
                        <option value="">Seçim Yapın</option>
                        <option value="Onaylandı">Onaylandı</option>
                        <option value="Hazırlanıyor">Hazırlanıyor</option>
                        <option value="Yolda">Yolda</option>
                        <option value="Teslim edildi">Teslim edildi</option>
                      </select>
                      <button className='answer-message-btn col-5' onClick={toggleProcessPopup}>Güncelle</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="row col-12 px-3 justify-content-between">
            <button className="tumunu-gor-btn-admin col-1" onClick={() => setCurrentPage(currentPage - 1)}>Geri</button>
            <button className="tumunu-gor-btn-admin col-1" onClick={() => setCurrentPage(currentPage + 1)}>İleri</button>
          </div>
        </div>
      </div>
      {isProcessPopupOpen && (
          <ProcessPopup
              onClose={(b) => {
                if (b === false) setProcessIsPopupOpen(b);
              }}
              text="Sipariş durumu güncellensin mi?"
              acceptedText="Sipariş durumu güncellendi"
              type="category_delete"
              id="1"
          />
      )}
      {isLastOrdersPopupOpen && (
          <LastOrdersPopup
              popupCloser={(b) => {
                if (b === false) setLastOrdersIsPopupOpen(b);
              }}
          />
      )}

    </div>
  );
}

export default Admin_aktif_siparis;
