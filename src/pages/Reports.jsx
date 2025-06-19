import {useEffect, useState} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/other/Pagination.jsx";

const Reports = () => {
    const reports = [
        {month: '05/2024',
            data: {
                bankTransfer: '14499₺',
                creditCard: '14499₺',
                totalPayment: '14499₺',
                netProfit: '14499₺',
                totalSales: '1449'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },
        {month: '06/2024',
            data: {
                bankTransfer: '12000₺',
                creditCard: '13000₺',
                totalPayment: '25000₺',
                netProfit: '5000₺',
                totalSales: '1500'
            }
        },

    ];
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);

    const currentReports = reports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div>
            <div className="admin-sag-container">
                <div className="row px-5 admin-genel-row" data-aos="fade-in">
                    <div className="col-12 alt-basliklar-admin mb-5">FİNANSAL RAPORLAR</div>
                    <table className="table table-striped  table-bordered">
                        <thead>
                        <tr>
                            <th className="text-center" scope="col">Rapor Tarihi</th>
                            <th className="text-center" scope="col">Havale</th>
                            <th className="text-center" scope="col">Kredi Kartı</th>
                            <th className="text-center" scope="col">Toplam</th>
                            <th className="text-center" scope="col">Net Kar</th>
                            <th className="text-center" scope="col">Yapılan Satış</th>
                            <th className="text-center" scope="col">Yazdır</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentReports.map((report, index) => (
                            <tr key={index}>
                                <th className="text-center" scope="row">{report.month}</th>
                                <td className="text-center">{report.data.bankTransfer}</td>
                                <td className="text-center">{report.data.creditCard}</td>
                                <td className="text-center">{report.data.totalPayment}</td>
                                <td className="text-center">{report.data.netProfit}</td>
                                <td className="text-center">{report.data.totalSales}</td>
                                <td>
                                    <div className="w-100 row justify-content-center p-0 m-0">
                                        <button className="col-12 bg-transparent border-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M16 18h-8v-1h8v1zm-2 1h-6v1h6v-1zm10-14v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 10h-12v7h12v-7zm4-8h-20v9h2v-3h16v3h2v-9zm-1.5 1c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"/>
                                            </svg>

                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage="5"/>
                </div>
            </div>
        </div>
    );
};

export default Reports;
