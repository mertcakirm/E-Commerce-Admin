import React, { useState, useEffect } from 'react';
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';

const Admin_aktif_siparis = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [orders, setOrders] = useState([
    { id: 1, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 2, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 3, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 4, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' },
    { id: 5, name: 'Furkan Geren', address: 'Şehitler Tepesi Mah. 3686 sokak Salkım evleri sitesi ablok kat 4 no 10', phone: '05237236273', payment: true, status: 'Hazırlanıyor' }
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">Aktif Sipariş Listesi</div>
          <div className="table-responsive">
            <table className="table">
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
                    <td><span className='green' style={{fontWeight:'600'}}>{order.payment ? 'Evet' : 'Hayır'}</span></td>
                    <td>
                      <p>Şuanki sipariş durumu: <span className='green'>{order.status}</span></p>
                      <select style={{marginRight:'5px', height:'35px'}} name="siparis-durumu-admin" id="siparis-durumu-admin">
                        <option value="Sipariş Durumu">Sipariş Durumu</option>
                        <option value="Onaylandı">Onaylandı</option>
                        <option value="Hazırlanıyor">Hazırlanıyor</option>
                        <option value="Yolda">Yolda</option>
                        <option value="Teslim edildi">Teslim edildi</option>
                      </select>
                      <button className='siparis-durumu-btn'>Güncelle</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Admin_aktif_siparis;
