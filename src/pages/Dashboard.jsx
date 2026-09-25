import './css/General.css';
import PieChart from "../components/Other/Chart.jsx";
import BarChart from "../components/Other/Scatter.jsx";
import { useState } from "react";
import InfoCarts from "../components/Dashboard/InfoCarts.jsx";
import LowStock from "../components/Dashboard/LowStock.jsx";
import ProductPopup from "../components/Popups/AddProductPopup.jsx"; 

const Dashboard = () => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    const handleOpenPopup = (productId) => {
        setSelectedProductId(productId);
        setShowUpdatePopup(true);
    };

    return (
        <div className="admin-sag-container">
            {/* Üst Kısım: Sayaçlar & Pasta Grafikler */}
            <div className="row g-3">
                {/* Sol: Metrik Kartları */}
                <div className="col-12 col-lg-6">
                    <InfoCarts />
                </div>

                {/* Sağ: Satış Dağılımı Kartı */}
                <div className="col-12 col-lg-6 d-flex">
                    <div 
                        className="bg-white border rounded-4 p-4 shadow-sm w-100 d-flex flex-column justify-content-center"
                        style={{ minHeight: "310px" }}
                    >
                        <div className="row g-3 align-items-center">
                            <div className="col-12 col-sm-6 border-end-sm">
                                <PieChart title="Genel Satış Dağılımı" type="general" />
                            </div>
                            <div className="col-12 col-sm-6">
                                <PieChart title="Aylık Satış Dağılımı" type="month" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alt Kısım: Bar Grafiği & Kritik Stok */}
            <div className="row g-3 mt-1 align-items-stretch">
                <div className="col-12 col-xl-6 d-flex">
                    <div className="w-100 bg-white border shadow-sm rounded-4 p-4 d-flex flex-column">
                        <BarChart title="Yıllık Satış Grafiği" type="general" />
                    </div>
                </div>

                <div className="col-12 col-xl-6 d-flex">
                    <div className="w-100 bg-white border shadow-sm rounded-4 p-4 d-flex flex-column">
                        <LowStock onProductClick={handleOpenPopup} />
                    </div>
                </div>
            </div>

            {/* Ürün Güncelleme / Detay Popup */}
            {showUpdatePopup && (
                <ProductPopup
                    popupCloser={(b) => setShowUpdatePopup(b)}
                    productId={selectedProductId}
                />
            )}
        </div>
    );
};

export default Dashboard;
