import '../Other/css/Accepted.css';
import {
    DeleteProductRequest, DeleteQuestionRequest,
    UpdateDiscountRequest,
} from "../../API/ProductApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {DeleteCategoryRequest} from "../../API/CategoriesApi.js";
import {DeleteCartRequest, DeleteSliderRequest} from "../../API/PageContentsApi.js";
import {ToggleUserActivityRequest} from "../../API/UserApi.js";
import {CompleteOrderStatus, DeleteReportRequest, UpdateOrderStatus} from "../../API/Order.js";
import {DeleteOffersRequest, ToggleOffersRequest} from "../../API/OfferApi.js";
import {ClearAuditLogsRequest} from "../../API/AuditLogApi.js";
import {IoCloseSharp} from "react-icons/io5";
import {MdOutlineDone} from "react-icons/md";

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

                case "toggle_offer": {
                    await ToggleOffersRequest(id);
                    toast.success("Kampanya aktiflik durumu başarıyla güncellendi!");
                    break;
                }
                case "delete_offer": {
                    await DeleteOffersRequest(id);
                    toast.success("Kampanya başarıyla silindi!");
                    break;
                }
                case "delete_slider": {
                    await DeleteSliderRequest(id);
                    toast.success("Slider başarıyla silindi!");
                    break;
                }
                case "delete_cart": {
                    await DeleteCartRequest(id);
                    toast.success("Kart başarıyla silindi!");
                    break;
                }
                case "clear_logs": {
                    await ClearAuditLogsRequest();
                    toast.success("Hareket geçmişi başarıyla silindi!");
                    break;
                }
                case "delete_report": {
                    await DeleteReportRequest(id);
                    toast.success("Rapor başarıyla silindi!");
                    break;
                }
                case "question_delete": {
                    await DeleteQuestionRequest(id);
                    toast.success("Soru başarıyla silindi!");
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
                        <IoCloseSharp size={30} color="white" />
                    </button>
                    <button
                        className="add-btn col-4"
                        style={{ background: 'green', border: 'none', height: '50px' }}
                        onClick={handleProcess}
                    >
                        <MdOutlineDone size={30} color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcessPopup;