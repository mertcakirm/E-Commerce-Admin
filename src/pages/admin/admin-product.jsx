import { useState, useEffect } from "react";
import Admin_sidebar from "./admin-sidebar";
const Admin_product = () => {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [discountValue, setDiscountValue] = useState("");
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productStock, setProductStock] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [purchasePrice, setPurchasePrice] = useState(0.0);
    const [sizes, setSizes] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [nextPage, setNextPage] = useState("http://213.142.159.49:8083/api/admin/product/all?page=0&size=10");
    const [currentPage, setCurrentPage] = useState(1);
  
    const productsPerPage = 10;
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      if (!nextPage) return;
  
      fetch(nextPage, {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts((prevProducts) => [...prevProducts, ...data.content]);
          setNextPage(data._links?.next?.href || null);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [nextPage]);
  
    useEffect(() => {
      return () => {
        images.forEach((image) => URL.revokeObjectURL(image.preview));
      };
    }, [images]);
  
    const filteredProducts = products.filter((product) => {
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
  
    // Calculate current products to display
    const currentProducts = filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  
    const handleClick = (e, page) => {
      e.preventDefault();
      setCurrentPage(page);
      setNextPage(`http://213.142.159.49:8083/api/admin/product/all?page=${page - 1}&size=10`);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
      setNextPage("http://213.142.159.49:8083/api/admin/product/all?page=0&size=10");
      setProducts([]); 
    };
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      const imagePreviews = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => resolve({ file, preview: reader.result });
        });
      });
  
      Promise.all(imagePreviews).then((images) => {
        setSelectedImages(images);
        setImages((prevImages) => [...prevImages, ...files]);
      });
    };
  
    const handleDelete = (productCode) => {
      fetch(`http://213.142.159.49:8083/api/admin/product/delete/${productCode}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => console.error("Error deleting product:", error));
      window.setTimeout(() => window.location.reload(), 1000);
    };
  
    const applyDiscount = () => {
      const discountRate = parseInt(discountValue);
      if (isNaN(discountRate) || discountRate < 0) {
        console.error("Invalid discount value");
        return;
      }
  
      const discountDTO = {
        discount: discountRate,
      };
  
      fetch(
        `http://213.142.159.49:8083/api/admin/product/update/discount/${selectedProductCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discountDTO),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              console.error("Server Error:", err);
              throw new Error("Network response was not ok");
            });
          }
          return response.json();
        })
        .then(() => {
          setProducts(
            products.map((product) =>
              product.productCode === selectedProductCode
                ? { ...product, discountRate: discountRate }
                : product
            )
          );
          setDiscountValue("");
          setSelectedProductCode(null);
        })
        .catch((error) => console.error("Error applying discount:", error));
      window.setTimeout(() => window.location.reload(), 1000);
    };
  
    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onloadend = function () {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
  
        reader.onerror = function () {
          reject(new Error("Dosya okuma hatası"));
        };
  
        reader.readAsDataURL(file);
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const productDTO = {
        productName: productName,
        description: productDescription,
        categoryString: productCategory || "",
        sizes: sizes || [],
        price: parseFloat(productPrice) || 0.0,
        purchasePrice: parseFloat(purchasePrice) || 0.0,
      };
  
      try {
        const imageBase64Array = [];
        for (const image of images) {
          if (image instanceof File || image instanceof Blob) {
            const base64String = await convertImageToBase64(image);
            imageBase64Array.push({ bytes: base64String });
          } else {
            console.error("Hatalı dosya tipi: ", image);
          }
        }
  
        productDTO.images = imageBase64Array;
  
        const response = await fetch(
          `http://213.142.159.49:8083/api/admin/product/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productDTO),
          }
        );
  
        if (!response.ok) {
          const errorData = response;
          console.error("Error response:", errorData);
          throw new Error("Failed to send data");
        }
  
        console.log("Veriler ve dosyalar başarıyla gönderildi");
        window.setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  
    const addStock = (event) => {
      event.preventDefault();
  
      if (sizeInput && quantityInput) {
        const updatedSizes = sizes.slice();
        let found = false;
  
        for (let i = 0; i < updatedSizes.length; i++) {
          if (updatedSizes[i].size === sizeInput) {
            updatedSizes[i].stock += parseInt(quantityInput, 10);
            found = true;
            break;
          }
        }
  
        if (!found) {
          updatedSizes.push({
            size: sizeInput,
            stock: parseInt(quantityInput, 10),
          });
        }
  
        const totalStock = updatedSizes.reduce(
          (total, item) => total + item.stock,
          0
        );
  
        setSizes(updatedSizes);
        setProductStock(totalStock);
        setSizeInput("");
        setQuantityInput("");
      }
    };
  
    // const handleSizeInputChange = (e) => {
    //   setSizeInput(e.target.value);
    // };
  
    // const handleQuantityInputChange = (e) => {
    //   setQuantityInput(e.target.value);
    // };
  
    // const handleImageClick = (image) => {
    //   window.open(URL.createObjectURL(image));
    // };
  
    // const handleProductClick = (product) => {
    //   setProductName(product.productName);
    //   setProductCategory(product.categoryString);
    //   setProductDescription(product.description);
    //   setProductPrice(product.price);
    //   setPurchasePrice(product.purchasePrice);
    //   setSizes(product.sizes || []);
    //   setShowPopup(true);
    // };


  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">
            <p>Ürün Listesi</p>
            <input
              type="text"
              placeholder="Ara..."
              className="admin-search-inp"
              value={searchTerm}
              onChange={handleSearch}
            />
            <br />
            <br />
            <button className="tumunu-gor-btn-admin" onClick={togglePopup}>
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
                    <th scope="col">Stok Sayısı</th>
                    <th scope="col">Ürün Fiyatı</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
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
            <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={(e) => handleClick(e, currentPage - 2)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => handleClick(e, currentPage + 1)}
                disabled={!nextPage}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <div></div>
              <button className="popup-close-btn" onClick={togglePopup}>
                &times;
              </button>
            </div>
            <form className="popup-form" onSubmit={handleSubmit}>
              <div className="row" style={{ rowGap: "10px" }}>
                <div className="col-6">
                  <h4>Resim Yönetim Paneli</h4>

                  <input type="file" multiple onChange={handleImageUpload} />
                  <div className="preview-flex">
                    {images.map((image, index) => (
                      <div className="preview-flex-child" key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`uploaded-img-${index}`}
                          width="100"
                        />
                        <p>{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-6">
                  <h4>Stok Yönetim Paneli</h4>
                  <div className="row mt-3">
                    <div className="col-3 row">
                      <div
                        style={{ padding: "0" }}
                        className="col-6 stok-giris-inp"
                      >
                        <input
                          type="text"
                          placeholder="XL"
                          value={sizeInput}
                          onChange={(e) => setSizeInput(e.target.value)}
                        />
                      </div>
                      <div className="col-6 stok-giris-inp">
                        <input
                          type="number"
                          placeholder="0"
                          value={quantityInput}
                          onChange={(e) => setQuantityInput(e.target.value)}
                        />
                      </div>
                      <button className="mt-3 col-12" onClick={addStock}>
                        Stok Ekle
                      </button>
                    </div>
                    <div className="col-9 stoklar-card-flex">
                      {sizes.map((item, index) => (
                        <div key={index} className="stok-card">
                          {item.size}: {item.stock}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h4>Ürün Yönetim Paneli</h4>

                <input
                  type="text"
                  placeholder="Ürün Adı"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="col-12"
                />
                <input
                  type="text"
                  placeholder="Ürün Kategorisi"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="col-12"
                />

                <input
                  type="text"
                  placeholder="Ürün Açıklaması"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="col-12"
                />
                <input
                  type="number"
                  placeholder="Ürün Alış Fiyatı"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="col-12"
                />
                <input
                  type="number"
                  placeholder="Ürün Fiyatı"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="col-12"
                />
                <button onClick={handleSubmit} type="submit">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_product;
