import { useEffect, useState } from "react";
import { GetAuditLogsRequest } from "../API/AuditLogApi.js";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import Pagination from "../components/Other/Pagination.jsx";

const Movements = () => {
    const [movements, setMovements] = useState([]);
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const toggleProcess = ({text, type, id}) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
        });
    };

    const GetMovements = async () => {
        try {
            const response = await GetAuditLogsRequest(page);
            if (response && response.data && response.data.data && response.data.data.items) {
                setMovements(response.data.data.items);
                setLastPage(response.data.data.totalPages);
            }
        } catch (error) {
            console.error("Audit log verisi alınırken hata oluştu:", error);
        }
    };

    useEffect(() => {
        GetMovements();
    }, [page,refresh]);

    return (
        <div className="admin-sag-container">
            <div className="row gap-4" data-aos="fade-up">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <div className="col-6 alt-basliklar-admin">Hareketlerin</div>
                        <button className="tumunu-gor-btn-admin bg-danger" onClick={() =>
                            toggleProcess({
                                text: `Hareket geçmişini sıfırlamak istiyor musunuz?`,
                                type: "clear_logs",
                                id: null
                            })
                        }>Hareket Geçmişini Sıfırla</button>
                    </div>
                </div>

                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped overflow-hidden table-bordered">
                            <thead>
                            <tr>
                                <th>İşlem ID</th>
                                <th>İşlem Yapılan Veri ID</th>
                                <th>İşlem Açıklaması</th>
                                <th>İşlem Tarihi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movements && movements.length > 0 ? (
                                movements.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id || "Belirtilmemiş"}</td>
                                        <td>{item.entityId || "Belirtilmemiş"}</td>
                                        <td>{item.details || "Belirtilmemiş"}</td>
                                        <td>{new Date(item.createdAt).toLocaleString("tr-TR") || "Belirtilmemiş"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-3">
                                        Henüz kayıtlı bir hareket bulunmuyor.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination pageNum={page} setPageNum={setPage} lastPage={lastPage}/>
                </div>
            </div>
            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setProcessConfig(prev => ({ ...prev, isOpen: false }));
                        setRefresh(!refresh);
                    }}
                />
            )}
        </div>
    );
};

export default Movements;