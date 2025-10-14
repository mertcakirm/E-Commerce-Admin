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
import DiscountPopup from "../components/Popups/DiscountPopup.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showDiscountPopup, setShowDiscountPopup] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [loading, setloading] = useState(true);
    const [reloadPage, setReloadPage] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [lastPage, setLastPage] = useState(0);

    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
        extraData: null
    });

    const toggleProcess = ({text, type, id, extraData}) => {
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
            const data = await GetProductsRequest(pageNum, pageSize, debouncedSearch);
            setLastPage(data.data.data.totalPages)
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

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 2000);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNum, debouncedSearch, reloadPage, pageSize]);

    if (loading) return <LoadingComp/>;

    return (
        <div>
            <div className="admin-sag-container">
                <div className="row admin-genel-row" data-aos="fade-in">
                    <div className="col-12 justify-content-between d-flex alt-basliklar-admin">
                        <p className="alt-basliklar-admin">Ürün Listesi</p>

                        <button className="tumunu-gor-btn-admin d-flex align-items-center gap-2 justify-content-center"
                                onClick={togglePopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"  viewBox="0 0 24 24">
                                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                            </svg>
                            <div>Ürün Ekle</div>
                        </button>
                    </div>

                    <div className="col-12">
                        <div className="table-responsive">
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="admin-search-inp mb-3"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <table className="table">
                                <thead>
                                <tr className="border-0">
                                    <th style={{borderRadius: '30px 0 0 30px', border: '0',paddingLeft:'15px'}}>Ürün Adı</th>
                                    <th className="border-0">Kategori</th>
                                    <th className="border-0">Satış</th>
                                    <th className="border-0">Stok</th>
                                    <th className="border-0">Fiyat</th>
                                    <th className="border-0">İndirim</th>
                                    <th className="border-0">Durum</th>
                                    <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                                </tr>
                                </thead>

                                <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            Ürün bulunamadı.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="d-flex gap-3 align-items-center">
                                                <div>#{product.id}</div>
                                                <img
                                                    className="rounded-5 urunler-listesi-img object-fit-cover"
                                                    style={{width: '50px', height: '50px'}}
                                                    src={
                                                        product.images.length > 0 && product.images[0].imageUrl
                                                            ? `https://localhost:7050${product.images[0].imageUrl}`
                                                            : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                    }
                                                    alt={product.productName || "Ürün Görseli"}
                                                />
                                                <div>{product.name}</div>
                                            </td>
                                            <td style={{width: '250px', wordBreak: 'break-all', textWrap: 'wrap',overflow:'hidden',overflowY:'visible'}}>
                                                {product.categoryNames && product.categoryNames.length > 0
                                                    ? product.categoryNames.join(", ")
                                                    : "-"}
                                            </td>
                                            <td>{product.saleCount}</td>
                                            <td>
                                                <div className="stok-flex">
                                                    <p>
                                                        {product.variants.reduce((total, size) => total + size.stock, 0)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="stok-details">
                                                    <p>Ana Fiyat : {product.price}₺</p>
                                                </div>
                                            </td>
                                            <td>
                                                {product.discountRate > 0 ? (<div>
                                                    <div>İndirim Oranı : {product.discountRate}%</div>
                                                    <div>İndirimli Fiyat : {product.priceWithDiscount}₺</div>
                                                </div>) : (<div>-</div>)}

                                            </td>
                                            <td>
                                                <button onClick={() =>
                                                    toggleProcess({
                                                        text: `Bu ürünü ${product.isDeleted ? "aktif" : "pasif"} yapmak istediğinize emin misiniz?`,
                                                        type: "product_delete",
                                                        id: product.id,
                                                    })
                                                }
                                                        className={`btn ${product.isDeleted ? "bg-danger text-light" : "bg-success text-light"}`}>{product.isDeleted ? "pasif" : "aktif"}</button>
                                            </td>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle" type="button"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                        <svg clipRule="evenodd" fillRule="evenodd"
                                                             strokeLinejoin="round" strokeMiterlimit="2" width="30"
                                                             height="30" fill="black" viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                                                        </svg>
                                                    </button>
                                                    <ul className="dropdown-menu rounded-2 border  overflow-hidden p-0">
                                                        <li>
                                                            <button onClick={() => {
                                                                setShowPopup(true);
                                                                setUpdateId(product.id)
                                                            }}
                                                                    className="user-edit-btn w-100">
                                                                <svg clipRule="evenodd" fillRule="evenodd"
                                                                     strokeLinejoin="round"
                                                                     strokeMiterlimit="2" fill="white" width="30"
                                                                     height="30"
                                                                     viewBox="0 0 24 24"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z"
                                                                        fillRule="nonzero"/>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center justify-content-center py-2 bg-info"
                                                                onClick={() => {
                                                                    setShowDiscountPopup(true);
                                                                    setSelectedProductId(product.id)
                                                                }}>
                                                                <svg width="24" height="24" fill="white"
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     fillRule="evenodd" clipRule="evenodd">
                                                                    <path
                                                                        d="M12.628 21.412l5.969-5.97 1.458 3.71-12.34 4.848-4.808-12.238 9.721 9.65zm-1.276-21.412h-9.352v9.453l10.625 10.547 9.375-9.375-10.648-10.625zm4.025 9.476c-.415-.415-.865-.617-1.378-.617-.578 0-1.227.241-2.171.804-.682.41-1.118.584-1.456.584-.361 0-1.083-.408-.961-1.218.052-.345.25-.697.572-1.02.652-.651 1.544-.848 2.276-.106l.744-.744c-.476-.476-1.096-.792-1.761-.792-.566 0-1.125.227-1.663.677l-.626-.627-.698.699.653.652c-.569.826-.842 2.021.076 2.938 1.011 1.011 2.188.541 3.413-.232.6-.379 1.083-.563 1.475-.563.589 0 1.18.498 1.078 1.258-.052.386-.26.763-.621 1.122-.451.451-.904.679-1.347.679-.418 0-.747-.192-1.049-.462l-.739.739c.463.458 1.082.753 1.735.753.544 0 1.087-.201 1.612-.597l.54.538.697-.697-.52-.521c.743-.896 1.157-2.209.119-3.247zm-9.678-7.476c.938 0 1.699.761 1.699 1.699 0 .938-.761 1.699-1.699 1.699-.938 0-1.699-.761-1.699-1.699 0-.938.761-1.699 1.699-1.699z"/>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>

                            <Pagination
                                pageNum={pageNum}
                                setPageNum={setPageNum}
                                lastPage={lastPage}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <AddProductPopup
                    popupCloser={(b) => {
                        setShowPopup(b)
                        setReloadPage(!reloadPage);
                        setUpdateId(null)
                    }}
                    productId={updateId}
                />
            )}

            {showDiscountPopup && (
                <DiscountPopup
                    popupCloser={setShowDiscountPopup}
                    id={selectedProductId}
                    toggleProcess={toggleProcess}
                />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    discount={processConfig.extraData}
                    onClose={() => {
                        setReloadPage(!reloadPage);
                        setProcessConfig(prev => ({...prev, isOpen: false}));
                    }}
                />
            )}
        </div>
    );
};

export default Products;