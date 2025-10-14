import {useState, useEffect} from 'react';
import './css/General.css';
import {
    GetSliderDataRequest,
    GetCartDataRequest
} from '../API/PageContentsApi.js';
import AddCartPopup from "../components/Popups/AddCartPopup.jsx";
import AddSliderContentPopup from "../components/Popups/AddSliderContentPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingComp from "../components/Other/Loading.jsx";
import {toast} from "react-toastify";
import ProcessPopup from "../components/Popups/processPopup.jsx"; // ✨ EKLENDİ

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
            console.log(sliders)
            setSliderData(sliders.data.data || []);
            const carts = await GetCartDataRequest();
            setCartData(carts.data.data || []);
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
                <div className="row" style={{height: "100vh"}}>

                    <div className="row admin-genel-row col-12">
                        <div className="col-12">
                            <div className="row row-gap-3">
                                <div className="row justify-content-between">
                                    <div className="col-6 alt-basliklar-admin">Slider İçerikleri</div>
                                    <button
                                        className="tumunu-gor-btn-admin col-3"
                                        style={{height: 'fit-content',width:'fit-content'}}
                                        onClick={() => setSliderPopup(true)}
                                    >
                                        Slider Ekle
                                    </button>
                                </div>

                                <div className="col-lg-12 row table-responsive">
                                    <table className="table text-center">
                                        <thead>
                                            <tr className="border-0">
                                                <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Görsel</th>
                                                <th className="border-0">Üst Başlık</th>
                                                <th className="border-0">Orta Başlık</th>
                                                <th className="border-0">Alt Başlık</th>
                                                <th className="border-0">Adres</th>
                                                <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {sliderData?.length > 0 ? (
                                            sliderData.map((slider) => (
                                                <tr key={slider.id}>
                                                    <td>
                                                        <img  src={slider.imageUrl && slider.imageUrl !== "string"
                                                                    ? (slider.imageUrl.startsWith("http")
                                                                        ? slider.imageUrl
                                                                        : `https://localhost:7050${slider.imageUrl.startsWith("/contents/") ? slider.imageUrl : `/contents/${slider.imageUrl}`}`)
                                                                    : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                            }
                                                            style={{maxWidth: '200px', objectFit: 'contain'}}
                                                            className="img-fluid w-100"
                                                            alt={slider.topTitle || "slider"}
                                                        />
                                                    </td>
                                                    <td className="text-center">{slider.parentName}</td>
                                                    <td className="text-center">{slider.name}</td>
                                                    <td className="text-center">{slider.subName}</td>
                                                    <td className="text-center">{slider.href}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className="add-btn bg-danger text-light fw-bold"
                                                            onClick={() =>
                                                                toggleProcess({
                                                                    text: "Bu slider silinsin mi?",
                                                                    type: "delete_slider",
                                                                    id: slider.id
                                                                })
                                                            }
                                                        >
                                                            Sil
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Slider bulunamadı.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row admin-genel-row col-12 mt-3">
                        <div className="col-12" style={{height: 'fit-content'}}>
                            <div className="row row-gap-3 h-100">
                                <div className="row justify-content-between">
                                    <div className="col-6 alt-basliklar-admin">Kategori Kartları</div>
                                    <button
                                        className="tumunu-gor-btn-admin col-4"
                                        style={{height: 'fit-content',width:'fit-content'}}
                                        onClick={() => setCartPopup(true)}
                                    >
                                        Kategori Kartı Ekle
                                    </button>
                                </div>


                                <div className="col-lg-12 row table-responsive">
                                    <table className="table text-center">
                                        <thead>
                                            <tr className="border-0">
                                                <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Görsel</th>
                                                <th className="border-0">Kart Adı</th>
                                                <th className="border-0">Adres</th>
                                                <th className="border-0">Boyut</th>
                                                <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {cartData?.length > 0 ? (
                                            cartData.map((cart) => (
                                                <tr key={cart.id}>
                                                    <td className="text-center">
                                                        <img
                                                            src={
                                                                cart.imageUrl && cart.imageUrl !== "string"
                                                                    ? (cart.imageUrl.startsWith("http")
                                                                        ? cart.imageUrl
                                                                        : `https://localhost:7050${cart.imageUrl.startsWith("/contents/") ? cart.imageUrl : `/contents/${cart.imageUrl}`}`)
                                                                    : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                            }
                                                            style={{maxWidth: '100px', objectFit: 'contain'}}
                                                            className="img-fluid w-100"
                                                            alt={cart.topTitle || "slider"}
                                                        />
                                                    </td>
                                                    <td className="text-center">{cart.name}</td>
                                                    <td className="text-center">{cart.href}</td>
                                                    <td className="text-center">{cart.cartSize}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className="add-btn bg-danger text-light fw-bold"
                                                            onClick={() =>
                                                                toggleProcess({
                                                                    text: "Bu kart silinsin mi?",
                                                                    type: "delete_cart",
                                                                    id: cart.id
                                                                })
                                                            }
                                                        >
                                                            Sil
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Kart bulunamadı.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setRefresh(!refresh)
                        setProcessConfig((prev) => ({...prev, isOpen: false}));
                    }}
                />
            )}
            {cartPopup && <AddCartPopup popupCloser={(b) => {
                setCartPopup(b)
                setRefresh(!refresh)
            }}/>}
            {sliderPopup && <AddSliderContentPopup popupCloser={(b) => {
                setSliderPopup(b)
                setRefresh(!refresh)
            }}/>}
        </div>
    )
}

export default PageContents;