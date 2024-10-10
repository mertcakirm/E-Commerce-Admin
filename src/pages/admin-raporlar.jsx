import React, { useState } from 'react';
import Admin_sidebar from './admin-sidebar';

const Admin_raporlar = () => {
  // Sample data for reports
  const reports = [
    { month: '05/2024', data: { bankTransfer: '14499₺', creditCard: '14499₺', totalPayment: '14499₺', netProfit: '14499₺', totalSales: '1449' } },
    { month: '06/2024', data: { bankTransfer: '12000₺', creditCard: '13000₺', totalPayment: '25000₺', netProfit: '5000₺', totalSales: '1500' } },
    { month: '06/2024', data: { bankTransfer: '12000₺', creditCard: '13000₺', totalPayment: '25000₺', netProfit: '5000₺', totalSales: '1500' } },
    { month: '06/2024', data: { bankTransfer: '12000₺', creditCard: '13000₺', totalPayment: '25000₺', netProfit: '5000₺', totalSales: '1500' } },
    { month: '06/2024', data: { bankTransfer: '12000₺', creditCard: '13000₺', totalPayment: '25000₺', netProfit: '5000₺', totalSales: '1500' } },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const currentReports = reports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin mb-5">RAPORLAR</div>
          {currentReports.map((report, index) => (
            <div key={index} className="col-lg-3 mb-3">
              <div className="rapor-card">
                <div className="rapor-card-baslik">{report.month}</div>
                <div className="row col-12 mb-3">
                  <div className="col-lg-8 finansal-bakis-anasayfa-admin">Havale ile Alınan Ödeme</div>
                  <div className="col-lg-4 finansal-bakis-anasayfa-admin">{report.data.bankTransfer}</div>
                </div>
                <div className="row col-12 mb-3">
                  <div className="col-lg-8 finansal-bakis-anasayfa-admin">Kredi Kartı ile Alınan Ödeme</div>
                  <div className="col-lg-4 finansal-bakis-anasayfa-admin">{report.data.creditCard}</div>
                </div>
                <div className="row col-12 mb-3">
                  <div className="col-lg-8 finansal-bakis-anasayfa-admin">Toplam Alınan Ödeme</div>
                  <div className="col-lg-4 finansal-bakis-anasayfa-admin">{report.data.totalPayment}</div>
                </div>
                <div className="row col-12 mb-3">
                  <div className="col-lg-8 finansal-bakis-anasayfa-admin">Toplam Net Kar</div>
                  <div className="col-lg-4 finansal-bakis-anasayfa-admin">{report.data.netProfit}</div>
                </div>
                <div className="row col-12 mb-3">
                  <div className="col-lg-8 finansal-bakis-anasayfa-admin">Toplam Yapılan Satış Sayısı</div>
                  <div className="col-lg-4 finansal-bakis-anasayfa-admin">{report.data.totalSales}</div>
                </div>
              </div>
            </div>
          ))}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Admin_raporlar;
