import React, { Component } from 'react'
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';


const Admin_anasayfa=()=> {
  const productsData = [
    { id: 1, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:2,small:3,large:5,xlarge:1,xsmall:2}},
    { id: 1, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:5,small:3,large:5,xlarge:1,xsmall:2}},
    { id: 3, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 4, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 5, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 6, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 7, name: "search", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" ,        stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 8, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:10,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 9, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 10, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 11, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 12, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
  ];

  const lowStockProducts = productsData.filter(product => {
    const totalStock = Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0);
    return totalStock < 20; 
  });
    return (
      <div>
        <Admin_sidebar />
        <div className="admin-sag-container">
            <div className="row admin-genel-row">
              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                  <div className="row">
                  <div className="col-lg-4 site-icerik-sayilari-content"><p>Ürün Sayısı</p><p>1000</p></div>
                  <div className="col-lg-4 site-icerik-sayilari-content"><p>Kullanıcı Sayısı</p><p>1000</p></div>
                  <div className="col-lg-4 site-icerik-sayilari-content"><p>Sipariş Sayısı</p><p>1000</p></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                  <div className="row">
                  <div className="col-lg-6 site-icerik-sayilari-content"><p>Bu Ay Satılan Ürün Sayısı</p><p>100.000</p></div>
                  <div className="col-lg-6 site-icerik-sayilari-content"><p>Bu Ay Toplam Ciro</p><p>100.000₺</p></div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                <div className="col-12 alt-basliklar-admin">En Çok Ürün Alan Kullanıcılar</div><br />

                  <div className="row en-cok-row scroll-table" style={{maxHeight:'550px'}} >


                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>



                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>


                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>

                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>
                    

                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>

                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>

                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>
                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>
                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>
                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>
                    <div className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </div>
                    
                    </div>
                    <div className="col-12 row justify-content-center mt-5"><a className='tumunu-gor-btn-admin col-6' href="/kullanicilar">Tüm Kullanıcıları Gör</a></div>

                </div>


                <div className="site-icerik-shadow ">
                  <div className="row en-cok-row scroll-table">
                    <div className="col-12 alt-basliklar-admin">Aylık Finansal Genel Bakış</div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Havale ile Alınan Ödeme</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Kredi Kartı  ile Alınan Ödeme</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Toplam Alınan Ödeme</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Toplam Net Kar</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Toplam Yapılan Satış Sayısı</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">1449</div>
                      </div>




                    </div>
                    <div className="col-12 row justify-content-center mt-5"><a className='tumunu-gor-btn-admin col-6' href="/raporlar">Tüm Raporları Gör</a></div>                    

                </div>
              </div>


              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                <div className="col-12 alt-basliklar-admin">En Çok Satın Alınan Ürünler</div>
                  <br />
                  <div className="row scroll-table en-cok-row" style={{maxHeight:'1060px'}}>

                    <a href='#' className="col-12 en-cok-card row" >
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>
                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>
                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>

                      </div>
                    </a>



                    
                    </div>
                    <div className="col-12 row justify-content-center mt-5"><a className='tumunu-gor-btn-admin col-6' href="/urunler">Tüm Ürünleri Gör</a></div>


                </div>

              </div>
              <div className="col-12 site-icerik-shadow mt-5">
                <h3>Stoğu Azalanlar</h3>
              <div className="table-responsive scroll-table2 mt-5">
                <table className="table ">
                  <thead className="table">
                    <tr>
                      <th scope="col">Ürün Kodu</th>
                      <th scope="col">Ürün Görseli</th>
                      <th scope="col">Ürün Adı</th>
                      <th scope="col">Ürün Kategorisi</th>
                      <th scope="col">Stok Sayısı</th>
                    </tr>
                  </thead>
                  <tbody>
                  {lowStockProducts.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td><img src={product.img} alt={product.name} className="img-fluid" style={{ maxWidth: '50px' }} /></td>
                      <td>{product.name}</td>
                      <td>{product.Kategori}</td>
                      <td style={{color:'red',fontWeight:'700'}}>{Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0)}</td>
                    </tr>
                  ))}



                  </tbody>
                </table>




                </div>
                <div className="col-12 row justify-content-center mt-5"><a className='tumunu-gor-btn-admin col-6' href="/urunler">Tüm Ürünleri Gör</a></div>

                </div>


            </div>
          </div>
      </div>
    )
  }


export default Admin_anasayfa;