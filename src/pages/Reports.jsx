import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Other/Pagination.jsx";
import { GetReportAllRequest } from "../API/Order.js";
import CreateReportPopup from "../components/Popups/CreateReportPopup.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import {IoMdPrint} from "react-icons/io";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const toggleProcess = ({ text, type, id }) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id
        });
    };

    const getReports = async () => {
        const response = await GetReportAllRequest(pageNum,pageSize);
        setReports(response.data.items);
        setLastPage(response.data.totalPages);
    };

    useEffect(() => {
        getReports();
        AOS.init({ duration: 500 });
    }, []);

    useEffect(() => {
        getReports();
    }, [pageNum, refresh,pageSize]);

    return (
        <div className="admin-sag-container">
            <div className="row" data-aos="fade-in">
                <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                    <div className="alt-basliklar-admin">Finansal Raporlar</div>
                    <button onClick={() => setPopupOpen(true)} className="tumunu-gor-btn-admin">Rapor Oluştur</button>
                </div>
                <div className="table-responsive">
                <table className="table text-center">
                    <thead>
                        <tr className="border-0">
                            <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Rapor Tarihi</th>
                            <th className="border-0">Havale</th>
                            <th className="border-0">Kredi Kartı</th>
                            <th className="border-0">Toplam</th>
                            <th className="border-0">Rapor Tarih Aralığı</th>
                            <th className="border-0">Yapılan Satış</th>
                            <th className="border-0">Yazdır</th>
                            <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4 fw-bold text-secondary">
                                Rapor bulunamadı.
                            </td>
                        </tr>
                    ) : (
                        reports.map((report) => (
                            <tr key={report.id}>
                                <td className="text-center" scope="row">
                                    {new Date(report.createdAt).toLocaleString("tr-TR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
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
                                </td>
                                <td className="text-center">{report.ordersCount}</td>
                                <td className="text-center">
                                    <button className="bg-transparent border-0">
                                        <IoMdPrint size={30} />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button
                                        className="add-btn bg-danger text-light fw-bold"
                                        onClick={() =>
                                            toggleProcess({
                                                text: "Bu rapor silinsin mi?",
                                                type: "delete_report",
                                                id: report.id
                                            })
                                        }
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
                    {reports.length > 0 && (
                        <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} pageSize={pageSize} setPageSize={setPageSize} />
                    )}
                </div>
            </div>

            {popupOpen && (
                <CreateReportPopup onClose={(b) => {
                    setPopupOpen(b);
                    setRefresh(!refresh);
                }} />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setRefresh(!refresh);
                        setProcessConfig((prev) => ({ ...prev, isOpen: false }));
                    }}
                />
            )}
        </div>
    );
};

export default Reports;