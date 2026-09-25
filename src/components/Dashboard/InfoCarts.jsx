import { useEffect, useState } from 'react';
import { formatLocalDate } from "../../Helpers/Helper.js";
import { GetProductsRequest } from "../../API/ProductApi.js";
import { GetAllUsersRequest } from "../../API/UserApi.js";
import { GetActiveOrders } from "../../API/Order.js";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBoxArchive } from "react-icons/fa6";
import { FaClipboardList, FaArrowRotateLeft } from "react-icons/fa6";
import { FiClock, FiDollarSign, FiShoppingBag, FiMessageSquare } from "react-icons/fi";
import './InfoCarts.css';

const InfoCarts = () => {
    const [time, setTime] = useState("");
    const [details, setDetails] = useState({
        productCount: 0,
        userCount: 0,
        orderCount: 0,
        todaySales: 18,
        totalRevenue: 248500,
        pendingMessages: 5,
        refundRate: 1.8
    });

    const getDetail = async () => {
        try {
            const [product, user, order] = await Promise.all([
                GetProductsRequest(1, 0, ""),
                GetAllUsersRequest(1, 0, ""),
                GetActiveOrders(1, 0)
            ]);

            setDetails(prev => ({
                ...prev,
                productCount: product?.data?.data?.totalCount ?? 0,
                userCount: user?.data?.data?.totalCount ?? 0,
                orderCount: order?.data?.totalCount ?? 0
            }));
        } catch (error) {
            console.error("Dashboard verileri yüklenirken hata oluştu:", error);
        }
    };

    useEffect(() => {
        getDetail();

        const updateClock = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);
    }, []);

    const cards = [
        {
            title: "Toplam Gelir",
            value: `₺${details.totalRevenue.toLocaleString()}`,
            icon: <FiDollarSign size={32} />,
            colorClass: "card-revenue"
        },
        {
            title: "Bugünkü Sipariş",
            value: details.todaySales.toLocaleString(),
            icon: <FiShoppingBag size={30} />,
            colorClass: "card-today"
        },
        {
            title: "Toplam Kullanıcı",
            value: details.userCount.toLocaleString(),
            icon: <PiUsersThreeFill size={36} />,
            colorClass: "card-users"
        },
        {
            title: "Toplam Ürün",
            value: details.productCount.toLocaleString(),
            icon: <FaBoxArchive size={30} />,
            colorClass: "card-products"
        },
        {
            title: "Aktif Sipariş",
            value: details.orderCount.toLocaleString(),
            icon: <FaClipboardList size={30} />,
            colorClass: "card-orders"
        },
        {
            title: "Bekleyen Mesaj",
            value: details.pendingMessages.toLocaleString(),
            icon: <FiMessageSquare size={30} />,
            colorClass: "card-messages"
        },
        {
            title: "İade Oranı",
            value: `%${details.refundRate}`,
            icon: <FaArrowRotateLeft size={28} />,
            colorClass: "card-refunds"
        }
    ];

    return (
        <div className="row g-2 col-12">
            {cards.map((card, index) => (
                <div key={index} className="col-12 col-sm-6">
                    <div className={`metric-card ${card.colorClass}`}>
                        <div className="metric-content">
                            <span className="metric-label">{card.title}</span>
                            <h2 className="metric-value">{card.value}</h2>
                        </div>
                        <div className="metric-icon-box">
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}

            {/* Zaman & Tarih Kartı (8. Kart) */}
            <div className="col-12 col-sm-6">
                <div className="metric-card card-time">
                    <div className="metric-content">
                        <span className="metric-label">{formatLocalDate(new Date(), false)}</span>
                        <h2 className="metric-value">{time || "--:--"}</h2>
                    </div>
                    <div className="metric-icon-box">
                        <FiClock size={32} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCarts;
