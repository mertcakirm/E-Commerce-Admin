import { useEffect, useState } from "react";
import { GetPassiveOrders } from "../../API/Order.js";
import Pagination from "../Other/Pagination.jsx";
import { 
    FiX, 
    FiClock, 
    FiPrinter, 
    FiMapPin, 
    FiMail, 
    FiPackage, 
    FiCalendar 
} from "react-icons/fi";

const LastOrdersPopup = ({ popupCloser }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const GetOrders = async () => {
        try {
            setLoading(true);
            const response = await GetPassiveOrders(currentPage, pageSize);
            setLastPage(response?.data?.totalPages || 1);
            setOrders(response?.data?.items || []);
        } catch (error) {
            console.error("Geçmiş siparişler alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetOrders();
    }, [currentPage, pageSize]);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
                padding: "1rem"
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "1150px",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    overflow: "hidden"
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        padding: "1.25rem 2rem",
                        borderBottom: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#ffffff"
                    }}
                >
                    <div className="d-flex align-items-center gap-3">
                        <div
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                backgroundColor: "#eff6ff",
                                color: "#2563eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FiClock size={22} />
                        </div>
                        <div>
                            <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                                Geçmiş Siparişler
                            </h5>
                            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                                Tamamlanan veya geçmişe dönük sipariş kayıtları.
                            </small>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => popupCloser(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                            e.currentTarget.style.color = "#0f172a";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#94a3b8";
                        }}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* TABLE BODY (SCROLLABLE) */}
                <div style={{ padding: "1.5rem 2rem", overflowY: "auto", flexGrow: 1 }}>
                    <div className="table-responsive border rounded-3 p-0 m-0">
                        <table className="table align-middle m-0 table-hover">
                            <thead style={{ backgroundColor: "#f8fafc" }}>
                                <tr style={{ fontSize: "0.78rem", borderBottom: "1px solid #e2e8f0" }}>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Kod</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Tarih</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold">Müşteri</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "180px" }}>Teslimat Adresi</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "220px" }}>Sipariş İçeriği</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end">Tutar</th>
                                    <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center">Belge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            Yükleniyor...
                                        </td>
                                    </tr>
                                ) : orders.length > 0 ? (
                                    orders.map(order => (
                                        <tr key={order.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                            {/* Sipariş No */}
                                            <td className="px-3 fw-bold text-dark">
                                                #{order.id}
                                            </td>

                                            {/* Sipariş Tarihi */}
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

                                            {/* Müşteri E-Posta */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-center gap-1.5 text-dark">
                                                    <FiMail size={13} className="text-muted flex-shrink-0" />
                                                    <span className="text-truncate" style={{ maxWidth: "160px" }}>
                                                        {order.userEmail}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Adres */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-start gap-1.5 text-secondary" style={{ fontSize: "0.82rem" }}>
                                                    <FiMapPin size={14} className="text-muted flex-shrink-0 mt-0.5" />
                                                    <span>{order.shippingAddress || "Adres belirtilmemiş"}</span>
                                                </div>
                                            </td>

                                            {/* Kalemler */}
                                            <td className="px-3 py-2">
                                                <div className="d-flex flex-column gap-1">
                                                    {order.orderItem?.map(item => (
                                                        <div key={item.orderItemId} className="d-flex flex-wrap gap-1">
                                                            {item.orderItemProduct?.map(prod => (
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
                                                                    <strong>#{prod.id}</strong> | {item.quantity} Adet
                                                                    {item.productVariantOrder?.length > 0 && (
                                                                        <span className="text-muted"> ({item.productVariantOrder.map(v => v.size).join(', ')})</span>
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Toplam Tutar */}
                                            <td className="px-3 text-end fw-bold text-dark" style={{ whiteSpace: "nowrap" }}>
                                                ₺{Number(order.totalAmount || 0).toLocaleString()}
                                            </td>

                                            {/* Yazdır Butonu */}
                                            <td className="px-3 text-center">
                                                <button
                                                    type="button"
                                                    title="Yazdır / Belge İndir"
                                                    style={{
                                                        backgroundColor: "#eff6ff",
                                                        border: "1px solid #dbeafe",
                                                        color: "#2563eb",
                                                        borderRadius: "8px",
                                                        width: "36px",
                                                        height: "36px",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        cursor: "pointer",
                                                        transition: "all 0.15s ease"
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.backgroundColor = "#2563eb";
                                                        e.currentTarget.style.color = "#ffffff";
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.backgroundColor = "#eff6ff";
                                                        e.currentTarget.style.color = "#2563eb";
                                                    }}
                                                >
                                                    <FiPrinter size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            Geçmiş sipariş kaydı bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FOOTER & SAYFALAMA */}
                <div
                    style={{
                        padding: "1rem 2rem",
                        borderTop: "1px solid #f1f5f9",
                        backgroundColor: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Pagination
                        pageNum={currentPage}
                        setPageNum={setCurrentPage}
                        lastPage={lastPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                </div>
            </div>
        </div>
    );
};

export default LastOrdersPopup;
