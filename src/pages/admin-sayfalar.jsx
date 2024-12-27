import {useState, useEffect, useRef} from 'react';
import Admin_sidebar from '../components/admin-sidebar.jsx';
import './admin-css/admin-genel.css';
import {
  fetchSliderData,
  addSlider,
  deleteSlider,
  fetchCartData,
  addCart,
  deleteCart,
} from './api/sayfalarapi';
import {NotificationCard, showNotification} from "../components/notification.jsx";
import {categoryDropdown} from "./api/categoryDropdown.js";

const Admin_sayfalar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderImage, setSliderImage] = useState({ bytes: "" });
  const [topTitle, setTopTitle] = useState("");
  const [middleTitle, setMiddleTitle] = useState("");
  const [underTitle, setUnderTitle] = useState("");
  const [redirectAddress, setRedirectAddress] = useState("");
  const [sliderData, setSliderData] = useState([]);
  const [cartImage, setCartImage] = useState("");
  const [cartName, setCartName] = useState("");
  const [cartCategory, setCartCategory] = useState("");
  const [cartSize, setCartSize] = useState("Tam");
  const [cartData, setCartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const notificationRef=useRef(null)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const token = localStorage.getItem("token");

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      setSliderImage(base64);
    }
  };

  const handleCartFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      setCartImage(base64);
    }
  };

  const sliderDTO = {
    image: { bytes: sliderImage },
    topTitle: topTitle,
    middleTitle: middleTitle,
    underTitle: underTitle,
    category: redirectAddress,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSlider(sliderDTO);
      showNotification(notificationRef, 'Slider başarıyla eklendi!');
      setSliderImage({ bytes: "" });
      setTopTitle("");
      setMiddleTitle("");
      setUnderTitle("");
      setRedirectAddress("");
    } catch (error) {
      console.error("Request error: ", error);
    }
  };


  const handleCartSubmit = async (e) => {
    e.preventDefault();
    const cartCategoryDTO = {
      cartName: cartName,
      viewType: cartSize,
      image: { bytes: cartImage },
      category: cartCategory,
    };
    
    try {
      await addCart(cartCategoryDTO, token);
      showNotification(notificationRef, 'Kategori kartı başarıyla eklendi!');
      setCartImage("");
      setCartName("");
      setCartCategory("");
      setCartSize("Tam");
      closeModal();
      window.setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Request error: ", error);
    }
  };

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
    }
  };

  const fetchCategory = async () =>{
    const data = await categoryDropdown();
    setCategories(data || []);
  };
  useEffect(() => {
    fetchData();
    fetchCategory();
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
        <div className="col-12 alt-basliklar-admin">Sayfa İçerikleri</div>
        <div className="row admin-genel-row">
          <div className="col-12">
            <div className="site-icerik-shadow2 row">
              <div className="col-12 alt-basliklar-admin">Slider İçerikleri</div>

              <div className="col-lg-4 sayfa-icerikleri-flex">
                <div className="row">
                  <label className='col-5' htmlFor="image">Slider Görseli</label>
                  <input className='col-7' type="file" id='image' onChange={handleFileChange} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="topTitle">Üst Başlık</label>
                  <input className='col-7' type="text" id='topTitle' value={topTitle} onChange={(e) => handleInputChange(e, setTopTitle)} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="middleTitle">Ana Başlık</label>
                  <input className='col-7' type="text" id='middleTitle' value={middleTitle} onChange={(e) => handleInputChange(e, setMiddleTitle)} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="underTitle">Alt Başlık</label>
                  <input className='col-7' type="text" id='underTitle' value={underTitle} onChange={(e) => handleInputChange(e, setUnderTitle)} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="redirectAddress">Kategori</label>
                  <select
                    className="col-7"
                    id='redirectAddress'
                    style={{height:"30px"}}
                    value={redirectAddress}
                    onChange={(e) => handleInputChange(e, setRedirectAddress)}
                    >
                    <option value="">Kategori Seçin</option>
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                        ))
                    ) : (
                        <option disabled>Kategori bulunamadı</option>
                    )}
                    </select>
                </div>
                <button  onClick={handleSubmit} className='tumunu-gor-btn-admin'>Slider Ekle</button>
              </div>

                <div className="col-lg-8 row sayfa-icerikleri-overflow" style={{padding:'2%'}}>
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

          <div className="row admin-genel-row">

          <div className="col-12">
            <div className="site-icerik-shadow2 row" style={{rowGap:'30px'}}>
              <div className="col-12 alt-basliklar-admin ">Kategori Kartları</div>
              <div>
              <button className='tumunu-gor-btn-admin col-12' onClick={openModal} style={{width:'300px', marginTop:'30px'}} >Kategori Kartı Ekle</button>
              </div>

                {cartData && cartData.length > 0 ? (
                  cartData.map((cart,index)=>
                <div className="col-lg-4">
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

      {/* Popup Modal */}
      {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="model-header">
                <h3>Kategori Kartı Ekle</h3>
                <button className="popup-close-btn" onClick={closeModal}>&times;</button>
              </div>
              <div className='row mt-3' style={{ rowGap: '30px' }}>
                <div className="row">
                  <label htmlFor="kategori-kart-ekle-resim" className='col-4'>Kart Resmi</label>
                  <input className='col-8' type="file" onChange={handleCartFileChange} />
                </div>
                <div className="row">
                  <label className='col-4' htmlFor="kategori-adi">Kart Adı</label>
                  <input className='col-8' type="text" id='kategori-adi' value={cartName} onChange={(e) => setCartName(e.target.value)} />
                </div>
                <div className="row">
                  <label className='col-4' htmlFor="yonlendirme-adresi">Kategori</label>
                  <select
                    className="col-8"
                    id='yonlendirme-adresi'
                    style={{height:"30px"}}
                    value={cartCategory}
                    onChange={(e) => setCartCategory(e.target.value)}
                    >
                    <option value="">Kategori Seçin</option>
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                        ))
                    ) : (
                        <option disabled>Kategori bulunamadı</option>
                    )}
                    </select>
                </div>
                <div className="row">
                  <label className='col-4' htmlFor="boyut">Boyut</label>
                  <select name="kart-kategori-select" id="kart-kategori-select" className="col-8" value={cartSize} onChange={(e) => setCartSize(e.target.value)}>
                    <option value="Tam">Full</option>
                    <option value="Yarım">Yarım</option>
                    <option value="1/3">1/3</option>
                  </select>
                </div>
                <button onClick={handleCartSubmit} className='tumunu-gor-btn-admin'>Kaydet</button>
              </div>
            </div>
          </div>
        )}
      <NotificationCard ref={notificationRef} message="" />

      </div>
    )
  }


export default Admin_sayfalar;