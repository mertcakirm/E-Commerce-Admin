import {useState, useEffect} from "react";
import {
    GetProductsRequest,
} from "../API/ProductApi.js";
import AddProductPopup from "../components/Popups/AddProductPopup.jsx";
import LoadingComp from "../components/Other/Loading.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import Pagination from "../components/Other/Pagination.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [discountValue, setDiscountValue] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [loading, setloading] = useState(true);
    const [reloadPage, setReloadPage] = useState(false);

    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
        extraData:null
    });

    const toggleProcess = ({ text, type, id, extraData }) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
            extraData,
        });
    };

    const fetchData = async () => {
        setloading(false);
        try {
            const data = await GetProductsRequest(pageNum,10);
            setProducts(data.data.data.items);
        } catch (err) {
            console.log(err)
            toast.error("Ürünler alınamadı.");
        } finally {
            setloading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNum(1);
        setProducts([]);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const applyDiscount = () => {
        if (!selectedProductCode || discountValue === "") return;
        toggleProcess({
            text: "Bu ürüne indirim uygulamak istiyor musunuz?",
            type: "product_discount",
            id: selectedProductCode,
            extraData: discountValue,
        });
    };

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNum, reloadPage]);

    if (loading) return <LoadingComp/>;

    return (
        <div>
            <div className="admin-sag-container">
                <div className="row admin-genel-row" data-aos="fade-in">
                    <div className="col-12 justify-content-between row alt-basliklar-admin">
                        <p className="col-12">Ürün Listesi</p>
                        <input
                            type="text"
                            placeholder="Ara..."
                            className="admin-search-inp col-3"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="tumunu-gor-btn-admin col-2" onClick={togglePopup}>
                            Ürün Ekle
                        </button>
                    </div>

                    <div className="col-12 mt-5">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Ürün Kodu</th>
                                    <th>Görsel</th>
                                    <th>Adı</th>
                                    <th>Kategori</th>
                                    <th>Satış</th>
                                    <th>Stok</th>
                                    <th>Fiyat</th>
                                    <th>İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <th>{product.id}</th>
                                        <td>
                                            <img
                                                className="img-fluid urunler-listesi-img"
                                                src={
                                                    product.images.length > 0 && product.images[0].imageUrl
                                                        ? `https://localhost:7050${product.images[0].imageUrl}`
                                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                }
                                                alt={product.productName || "Ürün Görseli"}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.categoryName}</td>
                                        <td>Toplam Satış : 80</td>
                                        <td>
                                            <div className="stok-flex">
                                                <p>
                                                    Toplam Stok:{" "}
                                                    {product.variants.reduce((total, size) => total + size.stock, 0)}
                                                </p>
                                                <div className="stok-details">
                                                    {product.variants.map((size, index) => (
                                                        <p key={index}>{size.size}: {size.stock}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="stok-details">
                                                <p>Güncel Fiyat : {product.price}₺</p>
                                                <p>İndirim Oranı : {product.discountRate}%</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-duzenle-row">
                                                <a href={`/urunler-guncelle/${product.productCode}`} className="user-edit-btn">
                                                    <svg fill="white" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-.123 6.526-1.238 3.84c0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249l3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591l-2.039-2.036a.833.833 0 0 0-.591-.245.833.833 0 0 0-.592.245z"/>
                                                    </svg>
                                                </a>
                                                <button className="user-sil-btn" onClick={() =>
                                                    toggleProcess({
                                                        text: "Bu ürünü silmek istediğinize emin misiniz?",
                                                        type: "product_delete",
                                                        id: product.id,
                                                    })
                                                }>
                                                    <svg fill="white" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.015 5.494h-.253a.747.747 0 1 1 0-1.494h5.253v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h5.254a.747.747 0 1 1 0 1.494h-.254v15.435c0 .591-.448 1.071-1 1.071H5.015c-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zM14.265 8c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zM13.5 4v-.5h-3v.5z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="indirim-uygula-flex">
                                                <input
                                                    type="number"
                                                    maxLength={2}
                                                    value={selectedProductCode === product.id ? discountValue : ""}
                                                    onChange={(e) => setDiscountValue(e.target.value)}
                                                    onFocus={() => setSelectedProductCode(product.id)}
                                                />
                                                <button className="siparis-durumu-btn" onClick={applyDiscount}>
                                                    İndirim Yap
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage="5"/>
                    </div>
                </div>
            </div>

            {showPopup && (
                <AddProductPopup
                    popupCloser={(b) => setShowPopup(b)}
                    reload={(a) => {
                        if (a === true) setReloadPage(a);
                    }}
                />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    discount={processConfig.extraData}
                    onClose={() => {
                        setReloadPage(prev => !prev);
                        setProcessConfig(prev => ({ ...prev, isOpen: false }));
                        setDiscountValue("");
                        setSelectedProductCode(null);
                    }}
                />
            )}
        </div>
    );
};

export default Products;