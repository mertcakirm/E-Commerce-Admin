import React, { Component } from 'react'
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';

const Admin_kategori_detail =()=> {
    return (
      <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="site-icerik-shadow col-12 row kategori-detay-row">
            <div className="col-lg-6">
              <label htmlFor="">Resim</label><input type="file" />
                <div className="resim-preview-card mt-3">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
            </div>
            <div className="col-lg-6">
            </div>
            <div className="col-lg-6">
              <input className='kategori-adi-detay-inp mt-3' type="text" name="kategori-adi-detay" id="kategori-adi-detay" placeholder='Yeni Kategori Adını Giriniz...' />
              
              <div>
              <button className="guncelle-btn mt-3">Kategoriyi Güncelle</button>
              </div>
            </div>
            
            <div className="col-lg-6">

            </div>
            <div className="col-lg-12 row justify-content-center">
            </div>
          </div> 
        </div>
      </div>
    </div>
    )
  }

export default Admin_kategori_detail;