import { useEffect, useState } from 'react';
import './css/General.css';
import AddOfferPopUp from "../components/Popups/AddOfferPopUp.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { GetOffersAllRequest } from "../API/OfferApi.js";

const Offers = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [proccessState, setProcessState] = useState({
        text: "",
        type: "",
        id: null,
        discount: null
    });

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    const GetOffers = async () => {
        const response = await GetOffersAllRequest();
        setOffers(response.data.data);
    };

    useEffect(() => {
        AOS.init({ duration: 500 });
        GetOffers();
    }, []);

    useEffect(() => {
        GetOffers();
    }, [refresh]);

    return (
        <div>
            <div className="admin-sag-container">
                <div className="row" data-aos="fade-in">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 row mb-5" style={{ rowGap: '30px', height: 'fit-content' }}>
                                <h3 className="col-6 alt-basliklar-admin">Kampanya Listesi</h3>
                                <div className="col-6 row justify-content-end">
                                    <button onClick={togglePopup} className='tumunu-gor-btn-admin col-4'>
                                        Kampanya Ekle
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 table-responsive">
                                <table className="table text-center">
                                    <thead>
                                    <tr className="border-0">
                                        <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Kampanya ID</th>
                                        <th className="border-0">Kampanya Görseli</th>
                                        <th className="border-0">Kampanya Başlığı</th>
                                        <th className="border-0">Başlangıç Tarihi</th>
                                        <th className="border-0">Bitiş Tarihi</th>
                                        <th className="border-0">İndirim Oranı (%)</th>
                                        <th className="border-0">Aktiflik Durumu</th>
                                        <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {offers && offers.length > 0 ? (
                                        offers.map((offer) => (
                                            <tr key={offer.id}>
                                                <td>#{offer.id}</td>
                                                <td>
                                                        {offer.imageUrl && offer.imageUrl !== "string" ? (
                                                            <img
                                                                className="img-fluid"
                                                                style={{ width: '100px' }}
                                                                src={offer.imageUrl.startsWith("http")
                                                                    ? offer.imageUrl
                                                                    : `https://localhost:7050${offer.imageUrl.startsWith("/offers/") ? offer.imageUrl : `/offers/${offer.imageUrl}`}`
                                                                }
                                                                alt={offer.name}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="img-fluid"
                                                                style={{ width: '100px' }}
                                                                src="https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                                alt="Görsel Yüklenemedi"
                                                            />
                                                        )}
                                                </td>
                                                <td>{offer.name}</td>
                                                <td>{new Date(offer.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(offer.endDate).toLocaleDateString()}</td>
                                                <td>{offer.discountRate}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        {offer.isActive ? "Aktif" : "Pasif"}
                                                        <button
                                                            className="btn"
                                                            onClick={() => {
                                                                setProcessState({
                                                                    text: "Kampanya aktiflik durumu güncellensin mi?",
                                                                    type: "toggle_offer",
                                                                    id: offer.id,
                                                                    discount: null
                                                                });
                                                                setProcessIsPopupOpen(true);
                                                            }}
                                                        >
                                                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z" fillRule="nonzero" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td style={{ position: 'relative', width: '200px' }}>
                                                    <div style={{ position: 'absolute', top: '0', left: '0' }}
                                                         className="row w-100 h-100 p-0 m-0 align-items-center justify-content-center">
                                                        <button className="user-sil-btn rounded-2 w-75"
                                                                onClick={() => {
                                                                    setProcessState({
                                                                        text: "Kampanya silinsin mi?",
                                                                        type: "delete_offer",
                                                                        id: offer.id,
                                                                        discount: null
                                                                    });
                                                                    setProcessIsPopupOpen(true);
                                                                }}>
                                                            Sil
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 fw-bold text-secondary">
                                                Kampanya bulunamadı.
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

            {isPopupOpen && (
                <AddOfferPopUp
                    popupCloser={(b) => {
                        if (b === false) setIsPopupOpen(b);
                        setRefresh(!refresh);
                    }}
                />
            )}

            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        setProcessIsPopupOpen(b);
                        setRefresh(!refresh);
                    }}
                    text={proccessState.text}
                    type={proccessState.type}
                    id={proccessState.id}
                    discount={proccessState.discount}
                />
            )}
        </div>
    );
};

export default Offers;