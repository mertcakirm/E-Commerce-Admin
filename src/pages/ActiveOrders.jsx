import {useEffect, useState} from 'react';
import './css/General.css';
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import LastOrdersPopup from "../components/Popups/LastOrdersPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Other/Pagination.jsx";
import {GetActiveOrders} from "../API/Order.js";

const ActiveOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [isLastOrdersPopupOpen, setLastOrdersIsPopupOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [proccessState, setProcessState] = useState({
        text:"",
        acceptedText:"",
        type:"",
        id:null,
        discount:null
    })

    const toggleLastOrdersPopup = () => {
        setLastOrdersIsPopupOpen(!isLastOrdersPopupOpen);
    };

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const GetOrders = async () => {
        const response = await GetActiveOrders();
        console.log(response)
        setOrders(response.data);
    }

    useEffect(() => {
        GetOrders();
    }, []);

    useEffect(() => {
        GetOrders();
    }, [refresh]);

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
                        <table className="table mt-3 table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Sipariş Kodu</th>
                                <th scope="col">Sipariş Tarihi</th>
                                <th scope="col">Müşteri Mail</th>
                                <th scope="col">Müşteri Adres</th>
                                <th scope="col">Sipariş İçeriği</th>
                                <th scope="col">Sipariş Tutarı</th>
                                <th scope="col">Sipariş Durumu</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <th scope="row">{order.id}</th>
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
                                            {order.orderItem.map(item => (
                                                <div key={item.orderItemId} style={{ marginBottom: '5px' }}>
                                                    {item.orderItemProduct.map(prod => (
                                                        <div key={prod.name}>
                                                            <strong>Ürün No:</strong> {prod.id} |{" "}
                                                            <strong>Adet:</strong> {item.quantity} |{" "}
                                                            <strong>Beden:</strong> {item.productVariantOrder.map(v => v.size).join(', ')}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{order.totalAmount}₺</td>
                                        <td className="row justify-content-center align-items-center">
                                            <p className="col-12">
                                                Şuanki sipariş durumu: <span className='green'>{order.status}</span>
                                            </p>
                                            <select
                                                className="col-6"
                                                style={{ marginRight: '5px' }}
                                                name="siparis-durumu-admin"
                                                id="siparis-durumu-admin"
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                            >
                                                <option value="">Seçim Yapın</option>
                                                <option value="Onaylandı">Onaylandı</option>
                                                <option value="Hazırlanıyor">Hazırlanıyor</option>
                                                <option value="Yolda">Yolda</option>
                                            </select>
                                            <button
                                                className='answer-message-btn col-5'
                                                onClick={() => {
                                                    setProcessState({
                                                        text: "Sipariş durumu güncellensin mi?",
                                                        acceptedText: "Sipariş durumu güncellendi",
                                                        type: "update_order",
                                                        id: order.id,
                                                        discount: selectedStatus
                                                    });
                                                    setProcessIsPopupOpen(true);
                                                }}
                                            >
                                                Güncelle
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className='answer-message-btn mt-3'
                                                onClick={() => {
                                                    setProcessState({
                                                        text: "Sipariş durumu güncellensin mi?",
                                                        acceptedText: "Sipariş durumu güncellendi",
                                                        type: "finish_order",
                                                        id: order.id,
                                                        discount: null
                                                    });
                                                    setProcessIsPopupOpen(true);
                                                }}
                                            >
                                                Siparişi Tamamla
                                            </button>
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
                    </div>
                    <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage="5"/>
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

        </div>
    );
}

export default ActiveOrders;
