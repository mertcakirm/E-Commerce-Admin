import './css/General.css';
import PieChart from "../components/Other/Chart.jsx";
import BarChart from "../components/Other/Scatter.jsx";
import {useState} from "react";
import "aos/dist/aos.css";
import UpdateProductPopup from "../components/Popups/UpdateProductPopup.jsx";
import InfoCarts from "../components/Dashboard/InfoCarts.jsx";
import LowStock from "../components/Dashboard/LowStock.jsx";

const Dashboard = () => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    const handleOpenPopup = (productId) => {
        setSelectedProductId(productId);
        setShowUpdatePopup(true);
    };

    return (
        <div>
            <div className="admin-sag-container">
                <div className="row admin-genel-row" data-aos="fade-up">

                    <div className="col-lg-6 justify-content-center col-12 mt-4 row">
                        <div className="row border shadow rounded-5 site-icerik-shadow"
                             style={{height: 'fit-content', padding: '50px 0px 100px 30px'}}>
                            <div className="col-lg-6 col-12 mb-5">
                                <PieChart title="Genel Satış Dağılımı" type="general"/>
                            </div>
                            <div className="col-lg-6 col-12">
                                <PieChart title="Aylık Satış Dağılımı" type="month"/>
                            </div>
                        </div>
                    </div>

                    <InfoCarts />

                    <div className="col-lg-6 justify-content-center col-12 mt-4 d-flex">
                        <div className="row w-100 border shadow rounded-5 site-icerik-shadow p-5" style={{height: 'fit-content'}}>
                            <div className="col-lg-12 col-12 ">
                                <BarChart title="Yıllık Satış Grafiği" type="general"/>
                            </div>

                        </div>
                    </div>


                    <LowStock onProductClick={handleOpenPopup}/>
                </div>
            </div>

            {showUpdatePopup && (
                <UpdateProductPopup
                    onClose={(b) => setShowUpdatePopup(b)}
                    productId={selectedProductId}
                />
            )}

        </div>
    )
}


export default Dashboard;