import { useEffect, useState } from 'react';
import './css/General.css';
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import LastOrdersPopup from "../components/Popups/LastOrdersPopup.jsx";
import Pagination from "../components/Other/Pagination.jsx";
import { GetActiveOrders } from "../API/Order.js";
import UpdateOrderPopup from "../components/Popups/UpdateOrderPopup.jsx";
import { 
    FiShoppingBag, 
    FiArchive, 
    FiMail, 
    FiMapPin, 
    FiCalendar, 
    FiPackage, 
    FiCheckCircle, 
    FiXCircle, 
    FiEdit3, 
    FiMoreVertical,
    FiTruck,
    FiClock
} from "react-icons/fi";

const ActiveOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [isLastOrdersPopupOpen, setLastOrdersIsPopupOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUpdateOrderPopupOpen, setIsUpdateOrderPopupOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [proccessState, setProcessState] = useState({
        text: "",
        type: "",
        id: null,
        discount: null
    });

    const GetOrders = async () => {
        try {
            setLoading(true);
            const response = await GetActiveOrders(currentPage, pageSize);
            setLastPage(response?.data?.totalPages || 1);
            setOrders(response?.data?.items || []);
        } catch (error) {
            console.error("Siparişler alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetOrders();
    }, [refresh, currentPage, pageSize]);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Onaylandı":
                return {
                    bg: "#ecfdf5",
                    color: "#059669",
                    border: "#a7f3d0",
                    icon: <FiCheckCircle size={13} />
                };
            case "Hazırlanıyor":
                return {
                    bg: "#fffbeb",
                    color: "#d97706",
                    border: "#fde68a",
                    icon: <FiClock size={13} />
                };
            case "Yolda":
                return {
                    bg: "#eff6ff",
                    color: "#2563eb",
                    border: "#bfdbfe",
                    icon: <FiTruck size={13} />
                };
            default:
                return {
                    bg: "#f1f5f9",
                    color: "#475569",
                    border: "#cbd5e1",
                    icon: <FiPackage size={13} />
                };
        }
    };

    return (
        <div className="admin-sag-container">
            {/* ÜST BAŞLIK VE AKSİYON ALANI */}
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FiShoppingBag size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Aktif Siparişler
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Süreçte olan ve teslimat bekleyen müşteri siparişleri
                        </small>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setLastOrdersIsPopupOpen(true)}
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        padding: "9px 18px",
                        borderRadius: "10px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "#334155",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                        transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                        e.currentTarget.style.borderColor = "#94a3b8";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                >
                    <FiArchive size={16} className="text-primary" />
                    Geçmiş Siparişler
                </button>
            </div>

            {/* TABLO KARTI */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                    padding: "1.25rem",
                    overflow: "hidden"
                }}
            >
                <div className="table-responsive p-0 m-0 border-0">
                    <table className="table align-middle m-0 table-hover">
                        <thead style={{ backgroundColor: "#f8fafc" }}>
                            <tr style={{ fontSize: "0.78rem", borderBottom: "1px solid #e2e8f0" }}>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Kod</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Tarih</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Müşteri</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "170px" }}>Teslimat Adresi</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "240px" }}>Sipariş İçeriği</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end">Tutar</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center">Durum</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        Siparişler yükleniyor...
                                    </td>
                                </tr>
                            ) : orders.length > 0 ? (
                                orders.map((order) => {
                                    const badge = getStatusBadge(order.status);
                                    return (
                                        <tr key={order.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                            {/* Sipariş Kodu */}
                                            <td className="px-3 fw-bold text-dark">
                                                #{order.id}
                                            </td>

                                            {/* Tarih */}
                                            <td className="px-3 text-secondary" style={{ whiteSpace: "nowrap" }}>
                                                <div className="d-flex align-items-center gap-1.5">
                                                    <FiCalendar size={13} className="text-muted" />
                                                    <span>
                                                        {new Date(order.orderDate).toLocaleString('tr-TR', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Müşteri Mail */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-center gap-1.5 text-dark">
                                                    <FiMail size={13} className="text-muted flex-shrink-0" />
                                                    <span className="text-truncate" style={{ maxWidth: "150px" }} title={order.userEmail}>
                                                        {order.userEmail}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Adres */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-start gap-1.5 text-secondary" style={{ fontSize: "0.82rem" }}>
                                                    <FiMapPin size={14} className="text-muted flex-shrink-0 mt-0.5" />
                                                    <span className="text-truncate" style={{ maxWidth: "180px" }} title={order.shippingAddress}>
                                                        {order.shippingAddress || "Adres belirtilmemiş"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Kalemler */}
                                            <td className="px-3 py-2">
                                                <div className="d-flex flex-column gap-1" style={{ maxHeight: "90px", overflowY: "auto" }}>
                                                    {order.orderItem?.map((item) => (
                                                        <div key={item.orderItemId} className="d-flex flex-wrap gap-1">
                                                            {item.orderItemProduct?.map((prod) => (
                                                                <span
                                                                    key={prod.name}
                                                                    style={{
                                                                        backgroundColor: "#f8fafc",
                                                                        border: "1px solid #e2e8f0",
                                                                        borderRadius: "6px",
                                                                        padding: "2px 8px",
                                                                        fontSize: "0.78rem",
                                                                        color: "#334155"
                                                                    }}
                                                                >
                                                                    <FiPackage size={12} className="me-1 text-primary" />
                                                                    <strong>#{prod.id}</strong> | {item.quantity} Ad.
                                                                    {item.productVariantOrder?.length > 0 && (
                                                                        <span className="text-muted"> ({item.productVariantOrder.map(v => v.size).join(', ')})</span>
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Tutar */}
                                            <td className="px-3 text-end fw-bold text-dark" style={{ whiteSpace: "nowrap" }}>
                                                ₺{Number(order.totalAmount || 0).toLocaleString()}
                                            </td>

                                            {/* Durum Badge */}
                                            <td className="px-3 text-center">
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        backgroundColor: badge.bg,
                                                        color: badge.color,
                                                        border: `1px solid ${badge.border}`,
                                                        borderRadius: "999px",
                                                        padding: "4px 10px",
                                                        fontSize: "0.78rem",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {badge.icon}
                                                    {order.status || "Beklemede"}
                                                </span>
                                            </td>

                                            {/* Dropdown Menü */}
                                            <td className="px-3 text-center">
                                                <div className="dropdown">
                                                    <button
                                                        className="btn p-1"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        style={{
                                                            border: "1px solid #e2e8f0",
                                                            borderRadius: "8px",
                                                            color: "#64748b",
                                                            width: "32px",
                                                            height: "32px",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                    >
                                                        <FiMoreVertical size={16} />
                                                    </button>
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-end shadow-sm border p-1"
                                                        style={{ borderRadius: "12px", minWidth: "210px" }}
                                                    >
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 rounded-2 text-dark"
                                                                style={{ fontSize: "0.85rem", fontWeight: 500 }}
                                                                onClick={() => {
                                                                    setSelectedOrderId(order.id);
                                                                    setIsUpdateOrderPopupOpen(true);
                                                                }}
                                                            >
                                                                <FiEdit3 size={15} className="text-primary" />
                                                                Durumu Güncelle
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 rounded-2 text-success"
                                                                style={{ fontSize: "0.85rem", fontWeight: 500 }}
                                                                onClick={() => {
                                                                    setProcessState({
                                                                        text: `#${order.id} numaralı siparişi tamamlamak istediğinize emin misiniz?`,
                                                                        type: "finish_order",
                                                                        id: order.id,
                                                                        discount: null
                                                                    });
                                                                    setProcessIsPopupOpen(true);
                                                                }}
                                                            >
                                                                <FiCheckCircle size={15} />
                                                                Siparişi Tamamla
                                                            </button>
                                                        </li>
                                                        <li><hr className="dropdown-divider my-1" /></li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 rounded-2 text-danger"
                                                                style={{ fontSize: "0.85rem", fontWeight: 500 }}
                                                                onClick={() => {
                                                                    setProcessState({
                                                                        text: `#${order.id} numaralı siparişi iptal etmek istediğinize emin misiniz?`,
                                                                        type: "delete_order",
                                                                        id: order.id,
                                                                        discount: null
                                                                    });
                                                                    setProcessIsPopupOpen(true);
                                                                }}
                                                            >
                                                                <FiXCircle size={15} />
                                                                Siparişi İptal Et
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        Aktif sipariş bulunmamaktadır.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SAYFALAMA */}
                <div className="pt-3 border-top mt-3">
                    <Pagination
                        pageNum={currentPage}
                        setPageNum={setCurrentPage}
                        lastPage={lastPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                </div>
            </div>

            {/* POPUP BİLEŞENLERİ */}
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        setProcessIsPopupOpen(b);
                        setRefresh(!refresh);
                    }}
                    text={proccessState.text}
                    acceptedText={proccessState.acceptedText}
                    type={proccessState.type}
                    id={proccessState.id}
                    discount={proccessState.discount}
                />
            )}

            {isLastOrdersPopupOpen && (
                <LastOrdersPopup
                    popupCloser={(b) => {
                        if (b === false) {
                            setLastOrdersIsPopupOpen(b);
                            setRefresh(!refresh);
                        }
                    }}
                />
            )}

            {isUpdateOrderPopupOpen && (
                <UpdateOrderPopup
                    popupCloser={(b) => setIsUpdateOrderPopupOpen(b)}
                    id={selectedOrderId}
                    toggleProcess={(data) => {
                        setProcessState(data);
                        setProcessIsPopupOpen(true);
                    }}
                />
            )}
        </div>
    );
};

export default ActiveOrders;
