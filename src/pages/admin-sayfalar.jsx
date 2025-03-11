import {useState, useEffect, useRef} from 'react';
import Admin_sidebar from '../components/admin-sidebar.jsx';
import './admin-css/admin-genel.css';
import {
  fetchSliderData,
  deleteSlider,
  fetchCartData,
  deleteCart,
} from './api/sayfalarapi';
import {NotificationCard, showNotification} from "../components/notification.jsx";
import AddCartPopup from "../components/child/addCartPopup.jsx";
import AddSliderContentPopup from "../components/child/addSliderContentPopup.jsx";

const Admin_sayfalar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [sliderData, setSliderData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const notificationRef=useRef(null)

  const openModal = () => setIsModalOpen(true);
  const openModal2 = () => setIsModalOpen2(true);




  const deleteSliderHandler = async (id) => {
    try {
      await deleteSlider(id);
      showNotification(notificationRef, 'Slider başarıyla silindi!');
      setSliderData(sliderData.filter(slider => slider.id !== id));
    } catch (error) {
      console.error("Request error: ", error);
      alert("An error occurred while deleting the slider.");
    }
    window.setTimeout(() => window.location.reload(), 500);
  };

  const deleteCartHandler = async (id) => {
    try {
      await deleteCart(id);
      showNotification(notificationRef, 'Kategori kartı başarıyla silidni!');
      setCartData(cartData.filter(cart => cart.id !== id));
    } catch (error) {
      console.error("Request error: ", error);
    }
    window.setTimeout(() => window.location.reload(), 500);
  };

  const fetchData = async () => {
    try {
      const sliders = await fetchSliderData();
      setSliderData(sliders || []);
      const carts = await fetchCartData();
      setCartData(carts || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
        <div
            className="d-flex justify-content-center"
            style={{ height: "100vh", alignItems: "center" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
  }

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12">
            <div className="row">
              <div className="row justify-content-between">
                <div className="col-6 alt-basliklar-admin">Slider İçerikleri</div>
                <button className="tumunu-gor-btn-admin col-2" onClick={openModal2}>Slider Ekle</button>
              </div>
                <div className="col-lg-8 row sayfa-icerikleri-overflow" style={{padding:'2% 1%'}}>
                  {sliderData && sliderData.length > 0 ? (
                      sliderData.map((slider, index) => (
                          <div key={index} className="col-12 row sliderlar-card site-icerik-shadow2">
                            <div className="col-lg-6">
                              <img
                                  src={`data:image/jpeg;base64,${slider.image.bytes}`}
                                  style={{ maxHeight: '300px', objectFit: 'contain' }}
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
                                  onClick={() => deleteSliderHandler(slider.id)}
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
                      <div>Kart Bulunamadı</div>
                  )}

                </div>
              </div>
            </div>
          </div>

          <div className="row admin-genel-row pt-3" style={{borderTop:'1px solid #000'}}>
          <div className="col-12">
            <div className="row" style={{rowGap:'30px'}}>

              <div className="row justify-content-between">
                <div className="col-6 alt-basliklar-admin">Kategori Kartları</div>
                <button className="tumunu-gor-btn-admin col-2" onClick={openModal}>Kategori Kartı Ekle</button>
              </div>

                {cartData && cartData.length > 0 ? (
                  cartData.map((cart,index)=>
                <div key={index} className="col-lg-4">
                  <div className="kategori-card-admin-sayfalar">
                    <img src={`data:image/jpeg;base64,${cart.image.bytes}`} className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt="" />
                    <p>Kart Kategori Adı : {cart.cartName}</p>
                    <p>Kategori : {cart.category}</p>
                    <p>Boyut : {cart.viewType}</p>
                    <button type="button" style={{width:'100%'}} onClick={() => deleteCartHandler(cart.id)} className='tumunu-gor-btn-admin'>Sil</button>
                  </div>
                </div>
                  )
                  ) : (
                  <div>Kart Bulunamadı</div>
                  )}
              </div>
            </div>
          </div>
        </div>

      {isModalOpen && (
          <AddCartPopup
              popupCloser={(b) => {
            if (b === false);
            setIsModalOpen(b);
          }} />
        )}
      {isModalOpen2 && (
          <AddSliderContentPopup
              popupCloser={(b) => {
                if (b === false);
                setIsModalOpen2(b);
              }} />
      )}
        <NotificationCard ref={notificationRef} message="" />
      </div>
    )
  }


export default Admin_sayfalar;