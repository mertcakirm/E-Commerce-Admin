import React, { useState } from 'react';
import Admin_sidebar from '../components/admin-sidebar.jsx';

const Admin_raporlar = () => {
  const reports = [
    { month: '05/2024', data: { bankTransfer: '14499₺', creditCard: '14499₺', totalPayment: '14499₺', netProfit: '14499₺', totalSales: '1449' } },
    { month: '06/2024', data: { bankTransfer: '12000₺', creditCard: '13000₺', totalPayment: '25000₺', netProfit: '5000₺', totalSales: '1500' } },
    { month: '06/2024', data: { bankTransfer: '12000₺', creditCard: '13000₺', totalPayment: '25000₺', netProfit: '5000₺', totalSales: '1500' } },
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
        <div className="row px-5 admin-genel-row">
          <div className="col-12 alt-basliklar-admin mb-5">FİNANSAL RAPORLAR</div>
              <table className="table table-striped  table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Rapor Tarihi</th>
                    <th scope="col">Havale</th>
                    <th scope="col">Kredi Kartı</th>
                    <th scope="col">Toplam</th>
                    <th scope="col">Net Kar</th>
                    <th scope="col">Yapılan Satış</th>
                  </tr>
                </thead>
                <tbody>
                {currentReports.map((report, index) => (
                    <tr key={index}>
                      <th scope="row">{report.month}</th>
                      <td>{report.data.bankTransfer}</td>
                      <td>{report.data.creditCard}</td>
                      <td>{report.data.totalPayment}</td>
                      <td>{report.data.netProfit}</td>
                      <td>{report.data.totalSales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            <div className="row col-12 px-3 justify-content-between">
              <button className="tumunu-gor-btn-admin col-2" onClick={() => setPageNum(pageNum - 1)}>Geri</button>
              <button className="tumunu-gor-btn-admin col-2" onClick={() => setPageNum(pageNum + 1)}>İleri</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_raporlar;
