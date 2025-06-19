import {useEffect, useState} from 'react';
import {categoryDropdownRequest} from "../../API/CategoriesApi.js";
import {AddCartRequest} from "../../API/PageContentsApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";

const AddCartPopup = ({popupCloser}) => {
    const [categories, setCategories] = useState([]);
    const [cartData, setCartData] = useState({
        cartImage: "",
        cartName: "",
        cartCategory: "",
        cartSize: ""
    });

    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await categoryDropdownRequest();
            setCategories(data || []);
        };
        AOS.init({duration: 500});

        fetchCategory();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCartData(prevState => ({
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
            setCartData(prevState => ({
                ...prevState,
                cartImage: base64,
            }));
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            const base64 = await convertImageToBase64(file);
            setCartData(prevState => ({
                ...prevState,
                cartImage: base64,
            }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleCartSubmit = async () => {
        const cartCategoryDTO = {
            cartName: cartData.cartName,
            viewType: cartData.cartSize,
            image: {bytes: cartData.cartImage},
            category: cartData.cartCategory,
        };

        try {
            await AddCartRequest(cartCategoryDTO);
            setCartData({
                cartImage: "",
                cartName: "",
                cartCategory: "",
                cartSize: "Tam"
            });
            toast.success("Kart başarıyla oluşturuldu!")
            popupCloser(false);
        } catch (error) {
            console.error("Request error: ", error);
            toast.error("Kart oluşturulamadı lütfen daha sonra tekrar deneyin!")

        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content" data-aos="zoom-in">
                <div className="model-header">
                    <h3>Kategori Kartı Ekle</h3>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>&times;</button>
                </div>
                <div className='row mt-3' style={{rowGap: '30px'}}>
                    <input
                        className='col-12 popup-inp'
                        type="text"
                        placeholder="Kart Adı"
                        name="cartName"
                        value={cartData.cartName}
                        onChange={handleInputChange}
                    />
                    <select
                        className="col-6"
                        name="cartCategory"
                        value={cartData.cartCategory}
                        onChange={handleInputChange}
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))
                        ) : (
                            <option disabled>Kategori bulunamadı</option>
                        )}
                    </select>
                    <select
                        name="cartSize"
                        className="col-6"
                        value={cartData.cartSize}
                        onChange={handleInputChange}
                    >
                        <option value="">Boyut Seçin</option>
                        <option value="Tam">Full</option>
                        <option value="Yarım">Yarım</option>
                        <option value="1/3">1/3</option>
                    </select>

                    <div
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="purple"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/>
                            </svg>
                            {cartData.cartImage ? "Görsel yüklendi" : " Kampanya görselini buraya sürükleyin veya yükleyin"}
                        </p>
                        <input
                            type="file"
                            className="file-input"
                            accept="image/*"
                            onChange={handleCartFileChange}
                            required
                        />
                    </div>

                    <button onClick={handleCartSubmit} className='tumunu-gor-btn-admin'>Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AddCartPopup;
