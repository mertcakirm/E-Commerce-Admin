import {useState, useEffect} from 'react';
import './css/General.css';
import {
    GetSliderDataRequest,
    GetCartDataRequest
} from '../API/PageContentsApi.js';
import AddCartPopup from "../components/PopUps/AddCartPopup.jsx";
import AddSliderContentPopup from "../components/PopUps/AddSliderContentPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingComp from "../components/other/Loading.jsx";
import {toast} from "react-toastify";
import ProcessPopup from "../components/PopUps/processPopup.jsx"; // ✨ EKLENDİ

const PageContents = () => {
    const [cartPopup, setCartPopup] = useState(false);
    const [sliderPopup, setSliderPopup] = useState(false);
    const [sliderData, setSliderData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
            id
        });
    };

    const fetchData = async () => {
        try {
            setLoading(false);
            const sliders = await GetSliderDataRequest();
            setSliderData(sliders || []);
            const carts = await GetCartDataRequest();
            setCartData(carts || []);
        } catch (error) {
            console.error("Veriler alınamadı:", error);
            toast.error("İçerikler yüklenirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [refresh]);

    if (loading) return <LoadingComp/>;

    return (
        <div>
            <div className="admin-sag-container" data-aos="fade-in">
                <div className="row admin-genel-row">
                    <div className="col-12">
                        <div className="row">
                            <div className="row justify-content-between">
                                <div className="col-6 alt-basliklar-admin">Slider İçerikleri</div>
                                <button className="tumunu-gor-btn-admin col-2" onClick={() => setSliderPopup(true)}>
                                    Slider Ekle
                                </button>
                            </div>
                            <div className="col-lg-8 row sayfa-icerikleri-overflow" style={{padding: '2% 1%'}}>
                                {sliderData && sliderData.length > 0 ? (
                                    sliderData.map((slider, index) => (
                                        <div key={index}
                                             className="col-12 row sliderlar-card site-icerik-shadow2">
                                            <div className="col-lg-6">
                                                <img
                                                    src={`data:image/jpeg;base64,${slider.image.bytes}`}
                                                    style={{maxHeight: '300px', objectFit: 'contain'}}
                                                    className="img-fluid w-100"
                                                    alt={slider.topTitle}
                                                />
                                            </div>
                                            <div className="col-lg-5">
                                                <p>Üst Başlık: {slider.topTitle}</p>
                                                <p>Ana Başlık: {slider.middleTitle}</p>
                                                <p>Alt Başlık: {slider.underTitle}</p>
                                                <p>Kategori: {slider.category}</p>
                                            </div>
                                            <div className="col-lg-1">
                                                <button
                                                    className="slider-edit-sil-btn"
                                                    onClick={() =>
                                                        toggleProcess({
                                                            text: "Bu slider silinsin mi?",
                                                            type: "slider_delete",
                                                            id: slider.id
                                                        })
                                                    }
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>Slider Bulunamadı.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row admin-genel-row pt-3" style={{borderTop: '1px solid #000'}}>
                    <div className="col-12">
                        <div className="row" style={{rowGap: '30px'}}>
                            <div className="row justify-content-between">
                                <div className="col-6 alt-basliklar-admin">Kategori Kartları</div>
                                <button className="tumunu-gor-btn-admin col-2" onClick={() => setCartPopup(true)}>
                                    Kategori Kartı Ekle
                                </button>
                            </div>
                            {cartData && cartData.length > 0 ? (
                                cartData.map((cart, index) => (
                                    <div key={index} className="col-lg-4">
                                        <div className="kategori-card-admin-sayfalar">
                                            <img src={`data:image/jpeg;base64,${cart.image.bytes}`}
                                                 className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt=""/>
                                            <p>Kart Kategori Adı : {cart.cartName}</p>
                                            <p>Kategori : {cart.category}</p>
                                            <p>Boyut : {cart.viewType}</p>
                                            <button type="button" style={{width: '100%'}}
                                                    onClick={() =>
                                                        toggleProcess({
                                                            text: "Bu kategori kartı silinsin mi?",
                                                            type: "cart_delete",
                                                            id: cart.id
                                                        })
                                                    }
                                                    className='tumunu-gor-btn-admin'>Sil
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>Kart Bulunamadı.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {cartPopup && (
                <AddCartPopup popupCloser={(b) => setCartPopup(b)}/>
            )}
            {sliderPopup && (
                <AddSliderContentPopup popupCloser={(b) => setSliderPopup(b)}/>
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setRefresh(prev => !prev);
                        setProcessConfig(prev => ({...prev, isOpen: false}));
                    }}
                />
            )}
        </div>
    )
}

export default PageContents;