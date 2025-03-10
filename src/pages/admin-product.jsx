import {useState, useEffect, useRef} from "react";
import Admin_sidebar from "../components/admin-sidebar.jsx";
import {
  deleteProduct,
  fetchProducts,
  updateDiscount,
} from "./api/productapi";
import {NotificationCard, showNotification} from "../components/notification.jsx";
import AddProductPopup from "../components/child/AddProductPopup.jsx";
import LoadingComp from "../components/child/Loading.jsx";

const Admin_product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProductCode, setSelectedProductCode] = useState(null);
  const [discountValue, setDiscountValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading,setloading]=useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const notificationRef=useRef(null);
  const [reloadPage,setReloadPage]=useState(false);
  const productsPerPage = 10;



  const fetchData = async () => {
      const data = await fetchProducts(pageNum);
      setloading(false);
      setProducts(data.content);
  };

  useEffect(() => {
    fetchData();
  }, [pageNum,reloadPage]);



  const filteredProducts = ()=>{
      const newProduct1 = products.filter((product) => {
      const productNameLower = product.productName?.toLowerCase() || "";
      const categoryName = product.category?.name?.toLowerCase() || "";
      const productCode = product.productCode?.toLowerCase() || "";
      const productId = product.id?.toString() || "";

      return (
          productNameLower.includes(searchTerm.toLowerCase()) ||
          categoryName.includes(searchTerm.toLowerCase()) ||
          productCode.includes(searchTerm.toLowerCase()) ||
          productId.includes(searchTerm)
      );
    });
    return newProduct1;
  };

  const currentProducts = () => {
    //return filteredProducts();
    const newProduct =  filteredProducts().slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );
    return newProduct;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setPageNum(0);
    setProducts([]);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDelete = (productCode) => {
    deleteProduct(productCode);
    setProducts(
      products.filter((product) => product.productCode !== productCode)
    );
    showNotification(notificationRef, 'Ürün başarıyla silindi!');

  };

  const applyDiscount = async () => {
    const discountRate = parseInt(discountValue);
    if (isNaN(discountRate) || discountRate < 0) {
      console.error("Invalid discount value");
      return;
    }
    showNotification(notificationRef, 'İndirim uygulandı!');

    await updateDiscount(discountRate, selectedProductCode);
    setProducts(
      products.map((product) =>
        product.productCode === selectedProductCode
          ? {
              ...product,
              discountRate: discountRate,
              priceWithDiscount:
                product.priceWithOutDiscount -
                product.priceWithOutDiscount * (discountRate / 100),
            }
          : product
      )

  );
    setDiscountValue("");
    setSelectedProductCode(null);
  };

  if (loading) {
    <LoadingComp />
  }

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 justify-content-between row alt-basliklar-admin">
            <p className="col-12">Ürün Listesi</p>
            <input
              type="text"
              placeholder="Ara..."
              className="admin-search-inp col-6"
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
                    <th scope="col">Ürün Kodu</th>
                    <th scope="col">Ürün Görseli</th>
                    <th scope="col">Ürün Adı</th>
                    <th scope="col">Ürün Kategorisi</th>
                    <th scope="col">Satış Bilgisi</th>
                    <th scope="col">Stok Sayısı</th>
                    <th scope="col">Ürün Fiyatı</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts().map((product) => (
                    <tr key={product.productCode}>
                      <th scope="row">{product.productCode}</th>
                      <td>
                        {product.productImage.length > 0 ? (
                          <img
                            className="img-fluid urunler-listesi-img"
                            src={`data:${product.productImage.type};base64,${product.productImage[0]?.bytes}`}
                            alt={product.productName}
                          />
                        ) : (
                          <p>Ürün Görseli Yok</p>
                        )}
                      </td>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td>Toplam Satış : 80</td>
                      <td>
                        <div className="stok-flex">
                          <p>
                            Toplam Stok:{" "}
                            {product.sizes.reduce(
                              (total, size) => total + size.stock,
                              0
                            )}
                          </p>
                          <div className="stok-details">
                            {product.sizes.map((size, index) => (
                              <p key={index}>
                                {size.size}: {size.stock}
                              </p>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stok-details">
                          <p>Ana Fiyat : {product.priceWithOutDiscount}₺</p>
                          <p>İndirim Oranı : {product.discountRate}%</p>
                          <p>İndirimli Fiyat : {product.priceWithDiscount}₺</p>
                        </div>
                      </td>
                      <td>
                        <div className="user-duzenle-row">
                          <a
                            href={`/urunler-guncelle/${product.productCode}`}
                            className="user-edit-btn"
                          >
                            <svg
                              fill="white"
                              width="30"
                              height="30"
                              clipRule="evenodd"
                              fillRule="evenodd"
                              strokeLinejoin="round"
                              strokeMiterlimit="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </a>
                          <button
                            className="user-sil-btn"
                            onClick={() => handleDelete(product.productCode)}
                          >
                            <svg
                              clipRule="evenodd"
                              fillRule="evenodd"
                              width="30"
                              height="30"
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
                        <div className="indirim-uygula-flex">
                          <input
                            type="number"
                            maxLength={2}
                            value={
                              selectedProductCode === product.productCode
                                ? discountValue
                                : ""
                            }
                            onChange={(e) => setDiscountValue(e.target.value)}
                            onFocus={() =>
                              setSelectedProductCode(product.productCode)
                            }
                          />
                          <button
                            className="siparis-durumu-btn"
                            onClick={applyDiscount}
                            disabled={!selectedProductCode}
                          >
                            İndirim Yap
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row col-12 px-3 justify-content-between">
              <button className="tumunu-gor-btn-admin col-1" onClick={()=>setPageNum(pageNum-1)}>Geri</button>
              <button className="tumunu-gor-btn-admin col-1" onClick={()=>setPageNum(pageNum+1)}>İleri</button>
            </div>
          </div>
        </div>
      </div>
      <NotificationCard ref={notificationRef} message="" />
      {showPopup && (
          <AddProductPopup
              popupCloser={(b) => {
                if (b === false);
                setShowPopup(b);
              }}
              reload={(a)=>{
                if (a === true) {
                  setReloadPage(a)
                }
              }}
          />
      )}
    </div>
  );
};

export default Admin_product;