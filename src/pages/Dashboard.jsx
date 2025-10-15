import './css/General.css';
import PieChart from "../components/Other/Chart.jsx";
import BarChart from "../components/Other/Scatter.jsx";
import {useState, useRef, useEffect} from "react";
import "aos/dist/aos.css";
import InfoCarts from "../components/Dashboard/InfoCarts.jsx";
import LowStock from "../components/Dashboard/LowStock.jsx";
import AddProductPopup from "../components/Popups/AddProductPopup.jsx";

const Dashboard = () => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    const barRef = useRef();
    const lowRef = useRef();

    const handleOpenPopup = (productId) => {
        setSelectedProductId(productId);
        setShowUpdatePopup(true);
    };

    // 🟢 Yükseklikleri eşitle
    useEffect(() => {
        const resizeHeights = () => {
            if (!barRef.current || !lowRef.current) return;
            const maxHeight = Math.max(barRef.current.offsetHeight, lowRef.current.offsetHeight);
            barRef.current.style.height = maxHeight + 'px';
            lowRef.current.style.height = maxHeight + 'px';
        };
        resizeHeights();
        window.addEventListener('resize', resizeHeights);
        return () => window.removeEventListener('resize', resizeHeights);
    }, []);

    return (
        <div>
            <div className="admin-sag-container">
                <div className="row admin-genel-row" data-aos="fade-up">

                    {/* PieChart Row */}
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

                    {/* InfoCarts */}
                    <InfoCarts />

                    <div className="col-lg-12 row mt-4 d-flex">
                        <div className="col-lg-6 d-flex">
                            <div ref={barRef} className="row w-100 border shadow rounded-5 site-icerik-shadow p-5">
                                <div className="col-lg-12 col-12">
                                    <BarChart title="Yıllık Satış Grafiği" type="general"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 d-flex">
                            <div ref={lowRef} style={{ width: '100%' }}>
                                <LowStock onProductClick={handleOpenPopup}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {showUpdatePopup && (
                <AddProductPopup
                    popupCloser={(b) => setShowUpdatePopup(b)}
                    productId={selectedProductId}
                />
            )}

        </div>
    )
}

export default Dashboard;