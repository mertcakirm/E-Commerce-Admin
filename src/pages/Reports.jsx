import {useEffect, useState} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Other/Pagination.jsx";
import {GetReportAllRequest} from "../API/Order.js";
import CreateReportPopup from "../components/Popups/CreateReportPopup.jsx";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const getReports = async () => {
        const response = await GetReportAllRequest(pageNum);
        console.log(response.data);
        setReports(response.data.items);
        setLastPage(response.data.totalPages)
    }

    useEffect(() => {
        getReports();
        AOS.init({duration: 500});
    }, []);

    useEffect(() => {
        getReports();
    }, [pageNum,refresh]);

    return (
            <div className="admin-sag-container">
                <div className="row px-5 admin-genel-row" data-aos="fade-in">
                    <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                        <div className="alt-basliklar-admin">FİNANSAL RAPORLAR</div>
                        <button onClick={()=>setPopupOpen(true)} className="tumunu-gor-btn-admin">Rapor Oluştur</button>
                    </div>
                    <table className="table table-striped  table-bordered">
                        <thead>
                        <tr>
                            <th className="text-center" scope="col">Rapor Tarihi</th>
                            <th className="text-center" scope="col">Havale</th>
                            <th className="text-center" scope="col">Kredi Kartı</th>
                            <th className="text-center" scope="col">Toplam</th>
                            <th className="text-center" scope="col">Rapor Tarih Aralığı</th>
                            <th className="text-center" scope="col">Yapılan Satış</th>
                            <th className="text-center" scope="col">Yazdır</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <th className="text-center" scope="row">
                                    {new Date(report.createdAt).toLocaleString("tr-TR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </th>
                                <td className="text-center">{report.transferTotal}₺</td>
                                <td className="text-center">{report.creditCartTotal}₺</td>
                                <td className="text-center">{report.totalAmount}₺</td>
                                <td className="text-center">
                                    {new Date(report.startDate).toLocaleDateString("tr-TR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}{" "}
                                    -{" "}
                                    {new Date(report.endDate).toLocaleDateString("tr-TR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </td>                                <td className="text-center">{report.ordersCount}</td>
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
                    <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage}/>
                </div>
                {popupOpen && (
                    <CreateReportPopup onClose={(b)  => {
                        setPopupOpen(b);
                        setRefresh(!refresh);
                    }} />
                )}
            </div>
    );
};

export default Reports;
