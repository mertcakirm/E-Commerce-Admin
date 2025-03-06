import {useEffect, useRef, useState} from 'react';
import {categoryDropdown} from "../../pages/api/kategoriapi.js";
import {addCart} from "../../pages/api/sayfalarapi.js";
import {NotificationCard, showNotification} from "../notification.jsx";

const AddCartPopup = ({popupCloser}) => {
    const [categories, setCategories] = useState([]);
    const [cartData, setCartData] = useState({
        cartImage: "",
        cartName: "",
        cartCategory: "",
        cartSize: "Tam"
    });
    const notificationRef=useRef(null)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCartData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.onerror = () => reject(new Error("Dosya okuma hatası"));

            reader.readAsDataURL(file);
        });
    };


    const handleCartFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertImageToBase64(file);
            setCartData((prevState) => ({
                ...prevState,
                cartImage: base64,
            }));
        }
    };

    const fetchCategory = async () => {
        const data = await categoryDropdown();
        setCategories(data || []);
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleCartSubmit = async (e) => {
        e.preventDefault();
        const cartCategoryDTO = {
            cartName: cartData.cartName,
            viewType: cartData.cartSize,
            image: {bytes: cartData.cartImage},
            category: cartData.cartCategory,
        };

        try {
            await addCart(cartCategoryDTO);
            showNotification(notificationRef, 'Kategori kartı başarıyla eklendi!');
            setCartData({
                cartImage: "",
                cartName: "",
                cartCategory: "",
                cartSize: "Tam"
            });
            popupCloser(false);
        } catch (error) {
            console.error("Request error: ", error);
            popupCloser(false);
            showNotification(notificationRef, 'Kategori kartı eklenemedi!');

        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="model-header">
                    <h3>Kategori Kartı Ekle</h3>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>
                <div className='row mt-3' style={{rowGap: '30px'}}>
                    <div className="row">
                        <label htmlFor="kategori-kart-ekle-resim" className='col-4'>Kart Resmi</label>
                        <input className='col-8' type="file" onChange={handleCartFileChange}/>
                    </div>
                    <div className="row">
                        <label className='col-4' htmlFor="kategori-adi">Kart Adı</label>
                        <input
                            className='col-8'
                            type="text"
                            id='kategori-adi'
                            name="cartName"
                            value={cartData.cartName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label className='col-4' htmlFor="yonlendirme-adresi">Kategori</label>
                        <select
                            className="col-8"
                            id='yonlendirme-adresi'
                            name="cartCategory"
                            style={{height: "30px"}}
                            value={cartData.cartCategory}
                            onChange={handleInputChange}
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
                        <select
                            name="cartSize"
                            id="kart-kategori-select"
                            className="col-8"
                            value={cartData.cartSize}
                            onChange={handleInputChange}
                        >
                            <option value="Tam">Full</option>
                            <option value="Yarım">Yarım</option>
                            <option value="1/3">1/3</option>
                        </select>
                    </div>
                    <button onClick={handleCartSubmit} className='tumunu-gor-btn-admin'>Kaydet</button>
                </div>
            </div>
            <NotificationCard ref={notificationRef} message="" />
        </div>
    );
};

export default AddCartPopup;
