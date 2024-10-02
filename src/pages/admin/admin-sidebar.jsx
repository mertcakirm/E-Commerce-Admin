import React, { Component } from 'react';
import './admin-css/admin-sidebar.css';
import logo from '../../assets/mob_logo.png';
import { useNavigate } from 'react-router-dom';
const Admin_sidebar=()=> {
  
  const navigate = useNavigate();

  // window.location.href="/giris"
  const cikisyap = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

    return (
      <div>
        <div className="admin-sidebar-parent">
          <div className='admin-sidebar-logo-part'>
            <img src={logo} className='img-fluid logo' alt="" />
          </div>
          <div className='admin-sidebar-links'>
            <a className='admin-sidebar-link' href="/genel">Admin Panel</a>
            <a className='admin-sidebar-link' href="/urunler">Ürünler</a>
            <a className='admin-sidebar-link' href="/aktif-siparisler">Aktif Siparişler</a>
            <a className='admin-sidebar-link' href="/kategoriler">Kategoriler</a>
            <a className='admin-sidebar-link' href="/kullanicilar">Kullanıcılar</a>
            <a className='admin-sidebar-link' href="/kampanyalar">Kampanyalar</a>
            <a className='admin-sidebar-link' href="/sayfalar">Sayfa İçerikleri</a>
            <a className='admin-sidebar-link' href="/raporlar">Raporlar</a>
            <a className='admin-sidebar-link' href="/mesajlar">Mesajlar</a>
          </div>
          <button className='admin-sidebar-logout' onClick={cikisyap} >
          <svg fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/></svg><span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    )
  }


export default Admin_sidebar;