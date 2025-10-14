import {useEffect, useState} from 'react';
import './css/General.css';
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import LastOrdersPopup from "../components/Popups/LastOrdersPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Other/Pagination.jsx";
import {GetActiveOrders} from "../API/Order.js";
import UpdateOrderPopup from "../components/Popups/UpdateOrderPopup.jsx";

const ActiveOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [isLastOrdersPopupOpen, setLastOrdersIsPopupOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [isUpdateOrderPopupOpen, setIsUpdateOrderPopupOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [proccessState, setProcessState] = useState({
        text: "",
        acceptedText: "",
        type: "",
        id: null,
        discount: null
    })

    const toggleLastOrdersPopup = () => {
        setLastOrdersIsPopupOpen(!isLastOrdersPopupOpen);
    };

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const GetOrders = async () => {
        const response = await GetActiveOrders(currentPage, pageSize);
        setLastPage(response.data.totalPages)
        setOrders(response.data.items);
    }

    useEffect(() => {
        GetOrders();
    }, []);

    useEffect(() => {
        GetOrders();
    }, [refresh, currentPage, pageSize]);

    return (
        <div>
            <div className="admin-sag-container" data-aos="fade-in">
                <div className="row admin-genel-row">
                    <div className="col-12 row justify-content-between align-items-center">
                        <p className="alt-basliklar-admin col-6">Aktif Sipariş Listesi</p>
                        <button className="tumunu-gor-btn-admin col-2" onClick={toggleLastOrdersPopup}>Geçmiş
                            Siparişler
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr className="border-0">
                                <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Sipariş
                                    Kodu
                                </th>
                                <th className="border-0">Sipariş Tarihi</th>
                                <th className="border-0">Müşteri Mail</th>
                                <th className="border-0">Müşteri Adres</th>
                                <th className="border-0">Sipariş İçeriği</th>
                                <th className="border-0">Sipariş Tutarı</th>
                                <th className="border-0">Sipariş Durumu</th>
                                <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <td scope="row">#{order.id}</td>
                                        <td>{new Date(order.orderDate).toLocaleString('tr-TR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</td>
                                        <td>{order.userEmail}</td>
                                        <td>{order.shippingAddress ? order.shippingAddress : "Adres Yok"}</td>
                                        <td>
                                            <div style={{
                                                maxHeight: '100px',
                                                width: '300px',
                                                overflow: 'hidden',
                                                overflowY: 'visible'
                                            }}>
                                                {order.orderItem.map(item => (
                                                    <div key={item.orderItemId} style={{marginBottom: '5px'}}>
                                                        {item.orderItemProduct.map(prod => (
                                                            <div key={prod.name}>
                                                                <strong>Ürün No:</strong> {prod.id} |{" "}
                                                                <strong>Adet:</strong> {item.quantity} |{" "}
                                                                <strong>Beden:</strong> {item.productVariantOrder.map(v => v.size).join(', ')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{order.totalAmount}₺</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg clipRule="evenodd" fillRule="evenodd"
                                                         strokeLinejoin="round" strokeMiterlimit="2" width="30"
                                                         height="30" fill="black" viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                                                    </svg>
                                                </button>
                                                <ul className="dropdown-menu rounded-2 border shadow overflow-hidden p-0">
                                                    <li>
                                                        <button
                                                            style={{ borderBottom: '1px solid #ccc' }}
                                                            className="dropdown-item btn w-100 py-2"
                                                            onClick={() => {
                                                                setSelectedOrderId(order.id);
                                                                setIsUpdateOrderPopupOpen(true);
                                                            }}
                                                        >
                                                            Sipariş Durumunu Güncelle
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => {
                                                            setProcessState({
                                                                text: "Sipariş durumu güncellensin mi?",
                                                                acceptedText: "Sipariş durumu güncellendi",
                                                                type: "finish_order",
                                                                id: order.id,
                                                                discount: null
                                                            });
                                                            setProcessIsPopupOpen(true);
                                                        }} className="dropdown-item py-2 ">Siparişi Tamamla</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        Aktif sipariş yok.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage={lastPage} pageSize={pageSize} setPageSize={setPageSize}/>

                    </div>
                </div>
            </div>

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
}

export default ActiveOrders;
