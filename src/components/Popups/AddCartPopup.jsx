import {useEffect, useState} from 'react';
import {AddCartRequest} from "../../API/PageContentsApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import {GetCategoriesRequest, GetCategoryDropdownRequest} from "../../API/CategoriesApi.js";

const AddCartPopup = ({popupCloser}) => {
    const [categories, setCategories] = useState([]);
    const [cartData, setCartData] = useState({
        cartName: "",
        cartCategory: "",
        cartSize: "",
        cartImage: null        // 🔑 Dosya objesi tutulacak
    });

    const [dragging, setDragging] = useState(false);


    const fetchCategory = async () => {
        const data = await GetCategoriesRequest();
        setCategories(data.data || []);
    };


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCartData(prev => ({...prev, [name]: value}));
    };

    const handleCartFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCartData(prev => ({...prev, cartImage: file}));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setCartData(prev => ({...prev, cartImage: file}));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleDragLeave = () => setDragging(false);

    const handleCartSubmit = async () => {
        if (!cartData.cartImage) {
            toast.error("Lütfen bir görsel seçin");
            return;
        }

        const formData = new FormData();
        formData.append("Name", cartData.cartName);
        formData.append("CartSize", cartData.cartSize);
        formData.append("Href", cartData.cartCategory);
        formData.append("Image", cartData.cartImage);

        try {
            await AddCartRequest(formData);
            toast.success("Kart başarıyla oluşturuldu!");
            popupCloser(false);
            setCartData({
                cartName: "",
                cartCategory: "",
                cartSize: "",
                cartImage: null
            });
        } catch (error) {
            console.error("Request error: ", error);
            toast.error("Kart oluşturulamadı, lütfen tekrar deneyin!");
        }
    };


    useEffect(() => {
        AOS.init({duration: 500});
        fetchCategory();
    }, []);

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
                                <option key={category.id} value={category.name}>
                                    {category.name}
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

                    {/* Drag & Drop alanı */}
                    <div
                        className={`drop-zone col-12 ${dragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>
                            {cartData.cartImage
                                ? `Seçilen dosya: ${cartData.cartImage.name}`
                                : "Görseli buraya sürükleyin veya yükleyin"}
                        </p>
                        <input
                            type="file"
                            className="file-input"
                            accept="image/*"
                            onChange={handleCartFileChange}
                        />
                    </div>

                    <button onClick={handleCartSubmit} className='tumunu-gor-btn-admin'>Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AddCartPopup;