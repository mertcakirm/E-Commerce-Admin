import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect, useState} from "react";
import {GetPassiveOrders} from "../../API/Order.js";
import Pagination from "../Other/Pagination.jsx";

const LastOrdersPopup = ({popupCloser}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [lastPage, setLastPage] = useState(1);

    const GetOrders = async () => {
        const response = await GetPassiveOrders(currentPage);
        setLastPage(response.data.totalPages)
        setOrders(response.data.items);
    }

    useEffect(() => {
        AOS.init({duration: 500});
        GetOrders();
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "80%", maxHeight: "800px"}}>
                <div className="popup-header mb-3">
                    <h2>Geçmiş Siparişler Listesi</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>

                <div style={{maxHeight: '600px', overflow: 'hidden', overflowY: 'auto'}} className="table-responsive">
                    <table className="table m-0 table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Sipariş Kodu</th>
                            <th scope="col">Sipariş Tarihi</th>
                            <th scope="col">Müşteri Mail</th>
                            <th scope="col">Müşteri Adres</th>
                            <th scope="col">Sipariş İçeriği</th>
                            <th scope="col">Sipariş Tutarı</th>
                            <th scope="col">Belge Oluştur</th>
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
                                    </td>
                                    <td>{order.totalAmount}₺</td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <button className="btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                 viewBox="0 0 24 24">
                                                <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    Geçmiş sipariş yok.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage={lastPage}/>
            </div>
        </div>
    );
};

export default LastOrdersPopup;