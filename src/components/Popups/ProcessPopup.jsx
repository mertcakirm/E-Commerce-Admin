import '../Other/css/Accepted.css';
import {
    DeleteProductRequest,
    UpdateDiscountRequest,
} from "../../API/ProductApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {DeleteCategoryRequest} from "../../API/CategoriesApi.js";
import {DeleteCartRequest, DeleteSliderRequest} from "../../API/PageContentsApi.js";
import {ToggleUserActivityRequest} from "../../API/UserApi.js";
import {CompleteOrderStatus, UpdateOrderStatus} from "../../API/Order.js";

const ProcessPopup = ({ type, text, id, onClose, discount }) => {

    const handleProcess = async () => {
        try {
            switch (type) {
                case "product_discount": {
                    const discountRate = parseInt(discount);
                    if (isNaN(discountRate) || discountRate < 0) {
                        toast.error("Geçersiz indirim oranı!");
                        return;
                    }
                    await UpdateDiscountRequest(discountRate, id);
                    toast.success("İndirim başarıyla uygulandı!");
                    break;
                }
                case "product_delete": {
                    await DeleteProductRequest(id);
                    toast.success("Ürün başarıyla silindi!");
                    break;
                }
                case "category_delete": {
                    DeleteCategoryRequest(id);
                    toast.success("Kategori başarıyla silindi!");
                    break;
                }
                case "toggle_user": {
                    await ToggleUserActivityRequest(id);
                    toast.success("Kullanıcı aktiflik durumu değiştirildi!");
                    break;
                }
                case "update_order": {
                    await UpdateOrderStatus(id,discount);
                    toast.success("Sipariş durumu güncellendi!");
                    break;
                }
                case "finish_order": {
                    await CompleteOrderStatus(id);
                    toast.success("Sipariş tamamlandı!");
                    break;
                }

                default:
                    toast.error("Bilinmeyen işlem türü.");
                    return;
            }
        } catch (error) {
            console.error(error);
            toast.error("İşlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin!");
        } finally {
            onClose(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content checked-content-popup" data-aos="zoom-in">
                <p className="text-center">{text}</p>
                <div className="delete-popup-buttons row justify-content-between">
                    <button
                        className="add-btn col-4"
                        style={{ background: 'red', border: 'none', height: '50px' }}
                        onClick={() => onClose(false)}
                    >
                        <svg fill="white" width="30" height="30" clipRule="evenodd" fillRule="evenodd"
                             strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                        </svg>
                    </button>
                    <button
                        className="add-btn col-4"
                        style={{ background: 'green', border: 'none', height: '50px' }}
                        onClick={handleProcess}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcessPopup;