import '../pages/admin-css/admin-sidebar.css';
import logo from '../assets/white_logo.png';
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Admin_sidebar=()=> {
  
  const navigate = useNavigate();

  const cikisyap = () => {
    localStorage.removeItem("token");
    navigate('/');
  };
  const url = window.location.pathname.split("/").filter(Boolean).pop();
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
    return (
      <div>
        <div className="admin-sidebar-parent" data-aos="fade-in">
          <div className='admin-sidebar-logo-part'>
            <img src={logo} className='img-fluid logo' alt="" />
          </div>
            <div className='admin-sidebar-links'>
              <a className={`admin-sidebar-link ${url === "genel" ? "active-link" : ""}`} href="/genel">
                <div className="links-row align-items-center">
                  <svg clipRule="evenodd" fill="white" width="40" height="40" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><path d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z" fillRule="nonzero"/></svg>
                  <div className="admin-sidebar-link-text p-0">Dashboard</div>
                </div>

              </a>
              <a className={`admin-sidebar-link ${url === "urunler" ? "active-link" : ""}`} href="/urunler">
                <div className="links-row align-items-center">
                  <svg width="40" height="40"  viewBox="0 0 27 27" fill="white" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z"/></svg>
                  <div className="admin-sidebar-link-text ">Ürünler</div>
              </div>
              </a>
              <a className={`admin-sidebar-link ${url === "aktif-siparisler" ? "active-link" : ""}`} href="/aktif-siparisler">
                <div className="links-row align-items-center">
                  <svg width="40" height="40" viewBox="0 0 27 27" fill="white" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"/></svg>
                  <div className="admin-sidebar-link-text  p-0">Aktif Siparişler</div>
                </div>
              </a>

            <a className={`admin-sidebar-link ${url === "kategoriler" ? "active-link" : ""}`} href="/kategoriler">
              <div className="links-row align-items-center">
                <svg width="40" height="40" fill="white" viewBox="0 0 24 24" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" xmlns="http://www.w3.org/2000/svg"><path d="m20.998 8.498h-17.996c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.558-.456-.998-1.001-.998zm-.964-3.017h-16.03c-.524 0-1.001.422-1.001 1.007 0 .081-.01.016.14 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.916c.058-.436.055-.426.055-.482 0-.671-.575-1.001-1.001-1.001h-14.024c-.536 0-1.001.433-1.001 1 0 .056-.004.043.055.483z" fillRule="nonzero"/></svg>
                <div className="admin-sidebar-link-text ">Kategoriler</div>
              </div>

            </a>
            <a className={`admin-sidebar-link ${url === "kullanicilar" ? "active-link" : ""}`} href="/kullanicilar">
              <div className="links-row align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 27 27" ><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/></svg>
                <div className="admin-sidebar-link-text  p-0">Kullanıcılar</div>
              </div>
            </a>
            <a className={`admin-sidebar-link ${url === "kampanyalar" ? "active-link" : ""}`} href="/kampanyalar">
              <div className="links-row align-items-center">
                <svg width="40" height="40" fill="white" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12.628 21.412l5.969-5.97 1.458 3.71-12.34 4.848-4.808-12.238 9.721 9.65zm-1.276-21.412h-9.352v9.453l10.625 10.547 9.375-9.375-10.648-10.625zm4.025 9.476c-.415-.415-.865-.617-1.378-.617-.578 0-1.227.241-2.171.804-.682.41-1.118.584-1.456.584-.361 0-1.083-.408-.961-1.218.052-.345.25-.697.572-1.02.652-.651 1.544-.848 2.276-.106l.744-.744c-.476-.476-1.096-.792-1.761-.792-.566 0-1.125.227-1.663.677l-.626-.627-.698.699.653.652c-.569.826-.842 2.021.076 2.938 1.011 1.011 2.188.541 3.413-.232.6-.379 1.083-.563 1.475-.563.589 0 1.18.498 1.078 1.258-.052.386-.26.763-.621 1.122-.451.451-.904.679-1.347.679-.418 0-.747-.192-1.049-.462l-.739.739c.463.458 1.082.753 1.735.753.544 0 1.087-.201 1.612-.597l.54.538.697-.697-.52-.521c.743-.896 1.157-2.209.119-3.247zm-9.678-7.476c.938 0 1.699.761 1.699 1.699 0 .938-.761 1.699-1.699 1.699-.938 0-1.699-.761-1.699-1.699 0-.938.761-1.699 1.699-1.699z"/></svg>
                <div className="admin-sidebar-link-text  p-0">Kampanyalar</div>
              </div>
              </a>
            <a className={`admin-sidebar-link ${url === "sayfalar" ? "active-link" : ""}`} href="/sayfalar">
              <div className="links-row align-items-center">
                <svg clipRule="evenodd" fillRule="evenodd" width="40" height="40" fill="white" viewBox="0 0 27 27" strokeLinejoin="round" strokeMiterlimit="2" xmlns="http://www.w3.org/2000/svg"><path d="m17 17.75c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm5-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-9-4c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm7-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
                <div className="admin-sidebar-link-text  p-0">Sayfa İçerikleri</div>
              </div>
              </a>

            <a className={`admin-sidebar-link ${url === "raporlar" ? "active-link" : ""}`} href="/raporlar">
              <div className="links-row align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 27 27"><path d="M13 24h6c2.762 0 5-2.239 5-5v-6h-11v11zm3-7h5v1h-5v-1zm0 2h5v1h-5v-1zm-16 0c0 2.761 2.239 5 5 5h6v-11h-11v6zm3-1h2v-2h1v2h2v1h-2v2h-1v-2h-2v-1zm16-18h-6v11h11v-6c0-2.761-2.238-5-5-5zm-.5 3c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm0 5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm2.5-2h-5v-1h5v1zm-21-1v6h11v-11h-6c-2.761 0-5 2.239-5 5zm6.914-1.622l.708.708-1.415 1.414 1.414 1.414-.707.707-1.414-1.414-1.414 1.414-.708-.707 1.414-1.414-1.414-1.414.707-.707 1.415 1.414 1.414-1.415z"/></svg>
                <div className="admin-sidebar-link-text  p-0">Raporlar</div>
              </div>
              </a>

            <a className={`admin-sidebar-link ${url === "mesajlar" ? "active-link" : ""}`} href="/mesajlar">
              <div className="links-row align-items-center">
                <svg width="40" height="40" fill="white" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M24 23h-24v-13.275l2-1.455v-7.27h20v7.272l2 1.453v13.275zm-20-10.472v-9.528h16v9.527l-8 5.473-8-5.472zm14-.528h-12v-1h12v1zm0-3v1h-12v-1h12zm-7-1h-5v-3h5v3zm7 0h-6v-1h6v1zm0-2h-6v-1h6v1z"/></svg>
                <div className="admin-sidebar-link-text  p-0">Mesajlar</div>
              </div>
              </a>
          </div>
          <button className='admin-sidebar-logout' onClick={cikisyap} >
          <svg fill='white' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/></svg><span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    )
  }


export default Admin_sidebar;