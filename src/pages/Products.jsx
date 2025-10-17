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
import {GrUpdate} from "react-icons/gr";
import {RiDiscountPercentFill} from "react-icons/ri";
import {IoMdAdd} from "react-icons/io";
import {BsThreeDots} from "react-icons/bs";

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
                        <div>Ürün Listesi</div>
                        <button className="tumunu-gor-btn-admin d-flex align-items-center gap-2 justify-content-center"
                                onClick={togglePopup}>
                            <IoMdAdd size={25}/>
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
                                    <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Ürün
                                        Adı
                                    </th>
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
                                                    className="rounded-5 product-img object-fit-cover"
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
                                            <td style={{
                                                width: '250px',
                                                wordBreak: 'break-all',
                                                textWrap: 'wrap',
                                                overflow: 'hidden',
                                                overflowY: 'visible'
                                            }}>
                                                {product.categoryNames && product.categoryNames.length > 0
                                                    ? product.categoryNames.join(", ")
                                                    : "-"}
                                            </td>
                                            <td>{product.saleCount}</td>
                                            <td>
                                                <div className="stock-flex">
                                                    <p>
                                                        {product.variants.reduce((total, size) => total + size.stock, 0)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
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
                                                        className={`btn ${product.isActive ? "bg-danger text-light" : "bg-success text-light"}`}>{product.isActive ? "pasif" : "aktif"}</button>
                                            </td>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <BsThreeDots size={30}  />
                                                    </button>
                                                    <ul className="dropdown-menu rounded-2 border overflow-hidden p-0">
                                                        <li>
                                                            <button onClick={() => {
                                                                setShowPopup(true);
                                                                setUpdateId(product.id)
                                                            }}
                                                                    className="dropdown-item d-flex align-items-center gap-2 justify-content-center py-2" style={{ borderBottom: '1px solid #ccc' }}>
                                                                <GrUpdate size={20} />
                                                                <div className="fs-6">Ürünü Güncelle</div>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center gap-2 justify-content-center py-2"
                                                                onClick={() => {
                                                                    setShowDiscountPopup(true);
                                                                    setSelectedProductId(product.id)
                                                                }}>
                                                                <RiDiscountPercentFill size={24} />

                                                                <div>İndirim Yap</div>
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