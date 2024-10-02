import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; 
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';

const Admin_product_detail = () => {
    const { productCode } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [inputfile, setInputfile] = useState();
    const [priceWithOutDiscount, setPriceWithOutDiscount] = useState('');

    const location = useLocation();

    useEffect(() => {
        const urlpop = location.pathname.split('/').pop();
        fetch(`http://213.142.159.49:8083/api/admin/product/get/${urlpop}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setProductName(data.productName);
                setCategoryName(data.category?.name);
                setDescription(data.description);
                setType(data.type);
                setPriceWithOutDiscount(data.priceWithOutDiscount);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [productCode]);

    const handleDeleteImage = (id) => {
        fetch(`http://213.142.159.49:8083/api/admin/product/image/delete/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Image deleted:', data);
            setProduct(prevProduct => ({
                ...prevProduct,
                productImage: prevProduct.productImage.filter(image => image.id !== id)
            }));
        })
        .catch(error => {
            console.error('Error deleting image:', error);
        });
        window.setTimeout(()=>window.location.reload(),1000)

    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0) {
            alert('Lütfen yüklemek için bir dosya seçin.');
            return;
        }

        const files = new FormData();
        for (const file of selectedFiles) {
            files.append('files', file);
        }

        const productCodeFromUrl = location.pathname.split('/').pop();

        fetch(`http://213.142.159.49:8083/api/admin/add/photo/${productCodeFromUrl}`, {
            method: 'POST',
            body: files,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dosyalar yüklendi:', data);
            return fetch(`http://213.142.159.49:8083/api/admin/product/get/${productCodeFromUrl}`);
        })
        .then(response => response.json())
        .then(updatedProduct => {
            setProduct(updatedProduct);
            // Reload the page after the product is successfully updated
            window.location.reload();
        })
        .catch(error => {
            console.error('Dosyalar yüklenirken bir hata oluştu:', error);
        });
        window.setTimeout(()=>window.location.reload(),1000)
        }




        // const handleUpload = () => {
        //     if (selectedFiles.length === 0) {
        //         alert('Lütfen yüklemek için bir dosya seçin.');
        //         return;
        //     }
        
        //     const filePromises = Array.from(selectedFiles).map(file => {
        //         return new Promise((resolve, reject) => {
        //             const reader = new FileReader();
        //             reader.onloadend = () => {
        //                 const base64String = reader.result.split(',')[1]; // Extract base64 part
        //                 resolve({ fileName: file.name, base64String });
        //             };
        //             reader.onerror = reject;
        //             reader.readAsDataURL(file);
        //         });
        //     });
        
        //     Promise.all(filePromises)
        //         .then(filesBase64 => {
        //             const productCodeFromUrl = location.pathname.split('/').pop();
        //             const payload = filesBase64.map(({ fileName, base64String }) => ({
        //                 fileName,
        //                 base64String
        //             }));
        
        //             return fetch(`http://213.142.159.49:8083/api/admin/add/photo/${productCodeFromUrl}`, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body: JSON.stringify(payload),
        //             });
        //         })
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log('Dosyalar yüklendi:', data);
        //             return fetch(`http://213.142.159.49:8083/api/admin/product/get/${productCodeFromUrl}`);
        //         })
        //         .then(response => response.json())
        //         .then(updatedProduct => {
        //             setProduct(updatedProduct);
        //             // Reload the page after the product is successfully updated
        //             window.location.reload();
        //         })
        //         .catch(error => {
        //             console.error('Dosyalar yüklenirken bir hata oluştu:', error);
        //         });
        // };

    const handleSaveChanges = () => {
        const updatedProduct = {
            productCode: product.productCode,
            productName: productName,
            description: description,
            priceWithOutDiscount: priceWithOutDiscount,
        };
        const jsonitem=JSON.stringify(updatedProduct)
        const urlpop = location.pathname.split('/').pop();
        
        
        fetch(`http://213.142.159.49:8083/api/admin/product/update/${urlpop}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: jsonitem,

        })
        .then(response => response)
        .then(data => {
            console.log('Product updated:', data);
        })
        .catch(error => {
            console.error('Ürün güncellenirken bir hata oluştu:', error);
            alert('Ürün güncellenirken bir hata oluştu.');
        });
        window.setTimeout(()=>window.location.reload(),1000)

    };


    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Admin_sidebar />
            <div className="admin-sag-container">
                <div className="row admin-genel-row">
                    <div className="site-icerik-shadow col-12 row urun-detay-row">
                        <div className="col-lg-5">
                            <input 
                                type="file" 
                                id="fileInput" 
                                multiple 
                                onChange={handleFileChange}
                                value={inputfile}
                            />
                            <button 
                                className="fotograf-gonder" 
                                onClick={handleUpload}
                            >
                                Fotoğrafı Ekle
                            </button>
                        </div>
                        <div className="col-lg-7 resim-preview-card-parent">
                            {product.productImage.map((image, index) => (
                                <div className="resim-preview-card" key={image.id}>
                                    <img 
                                        className='img-fluid w-100' 
                                        src={`data:http://213.142.159.49:8083/api/files/image/${image.url};base64,${image.bytes}`} 
                                        alt={`Product Image ${index + 1}`} 
                                    />
                                    <button 
                                        className='resim-sil-btn' 
                                        onClick={() => handleDeleteImage(image.id)}
                                    >
                                        Resmi Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="col-12 mt-5 row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <label htmlFor="urun-detay-edit-ad" className="col-4">Ürün Adı</label>
                                    <input 
                                        type="text" 
                                        id='urun-detay-edit-ad' 
                                        className='col-8' 
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>

                                <div className="row mt-3">
                                    <label htmlFor="urun-detay-edit-content" className="col-4">Ürün Açıklaması</label>
                                    <input 
                                        type="text" 
                                        id='urun-detay-edit-content' 
                                        className='col-8' 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="row mt-3">
                                    <label htmlFor="urun-detay-edit-fiyat" className="col-4">Ürün Fiyatı</label>
                                    <input 
                                        type="number" 
                                        id='urun-detay-edit-fiyat' 
                                        className='col-8' 
                                        value={priceWithOutDiscount}
                                        onChange={(e) => setPriceWithOutDiscount(e.target.value)}
                                    />
                                </div>
                                <button 
                                    className='degisiklikleri-kaydet-btn mt-3' 
                                    onClick={handleSaveChanges}
                                >
                                    Ürün Bilgilerini Kaydet
                                </button>
                            </div>

                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Admin_product_detail;
