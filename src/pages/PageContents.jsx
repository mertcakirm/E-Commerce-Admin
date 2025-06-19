import {useState, useEffect} from 'react';
import './css/General.css';
import { DeleteSliderRequest, DeleteCartRequest, GetSliderDataRequest, GetCartDataRequest,
} from '../API/PageContentsApi.js';
import AddCartPopup from "../components/PopUps/AddCartPopup.jsx";
import AddSliderContentPopup from "../components/PopUps/AddSliderContentPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingComp from "../components/other/Loading.jsx";
import {toast} from "react-toastify";

const PageContents = () => {
    const [cartPopup, setCartPopup] = useState(false);
    const [sliderPopup, setSliderPopup] = useState(false);
    const [sliderData, setSliderData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);



    const DeleteSlider = async (id) => {
        try {
            await DeleteSliderRequest(id);
            setSliderData(sliderData.filter(slider => slider.id !== id));
            setRefresh(!refresh);
            toast.success("Slider başarıyla silindi!")
        } catch (error) {
            console.error("Request error: ", error);
            toast.error("Slider silinirken hata oluştu lütfen daha sonra tekrar deneyin!")
        }
    };

    const DeleteCart = async (id) => {
        try {
            await DeleteCartRequest(id);
            setCartData(cartData.filter(cart => cart.id !== id));
            setRefresh(!refresh);
            toast.success("Kart başarıyla silindi!")
        } catch (error) {
            console.error("Request error: ", error);
            toast.error("Kart silinirken hata oluştu lütfen daha sonra tekrar deneyin!")
        }
    };

    const fetchData = async () => {
        try {
            const sliders = await GetSliderDataRequest();
            setSliderData(sliders || []);
            const carts = await GetCartDataRequest();
            setCartData(carts || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false)
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [refresh]);

    if (loading) {
        <LoadingComp/>
    }

    return (
        <div>
            <div className="admin-sag-container" data-aos="fade-in">
                <div className="row admin-genel-row">
                    <div className="col-12">
                        <div className="row">
                            <div className="row justify-content-between">
                                <div className="col-6 alt-basliklar-admin">Slider İçerikleri</div>
                                <button className="tumunu-gor-btn-admin col-2" onClick={()=>setSliderPopup(true)}>Slider Ekle</button>
                            </div>
                            <div className="col-lg-8 row sayfa-icerikleri-overflow" style={{padding: '2% 1%'}}>
                                {sliderData && sliderData.length > 0 ? (
                                    sliderData.map((slider, index) => (
                                        <div key={index} className="col-12 row sliderlar-card site-icerik-shadow2">
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
                                                    onClick={() => DeleteSlider(slider.id)}
                                                >
                                                    <svg
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                        fill="white"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="2"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                                            fillRule="nonzero"
                                                        />
                                                    </svg>
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
                                <button className="tumunu-gor-btn-admin col-2" onClick={()=>setCartPopup(true)}>Kategori Kartı Ekle
                                </button>
                            </div>

                            {cartData && cartData.length > 0 ? (
                                cartData.map((cart, index) =>
                                    <div key={index} className="col-lg-4">
                                        <div className="kategori-card-admin-sayfalar">
                                            <img src={`data:image/jpeg;base64,${cart.image.bytes}`}
                                                 className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt=""/>
                                            <p>Kart Kategori Adı : {cart.cartName}</p>
                                            <p>Kategori : {cart.category}</p>
                                            <p>Boyut : {cart.viewType}</p>
                                            <button type="button" style={{width: '100%'}}
                                                    onClick={() => DeleteCart(cart.id)}
                                                    className='tumunu-gor-btn-admin'>Sil
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div>Kart Bulunamadı.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {cartPopup && (
                <AddCartPopup
                    popupCloser={(b) => {
                        if (b === false) ;
                        setCartPopup(b);
                    }}/>
            )}
            {sliderPopup && (
                <AddSliderContentPopup
                    popupCloser={(b) => {
                        if (b === false) ;
                        setSliderPopup(b);
                    }}/>
            )}
        </div>
    )
}


export default PageContents;