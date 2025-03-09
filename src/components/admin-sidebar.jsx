import '../pages/admin-css/admin-sidebar.css';
import logo from '../assets/mob_logo.png';
import { useNavigate } from 'react-router-dom';
const Admin_sidebar=()=> {
  
  const navigate = useNavigate();

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
              <a className='admin-sidebar-link' href="/genel">
                <div className="row align-items-center">
                  <svg clipRule="evenodd" className="col-3" fill="white" width="40" height="40" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z" fillRule="nonzero"/></svg>
                  <div className="admin-sidebar-link-text col-6">Dashboard</div>
                </div>

              </a>
              <a className='admin-sidebar-link' href="/urunler">
                <div className="row align-items-center">
                  <svg width="40" height="40" viewBox="0 0 14 24" fill="white" className="col-3" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z"/></svg>
                  <div className="admin-sidebar-link-text col-6">Ürünler</div>
              </div>
              </a>
              <a className='admin-sidebar-link' href="/aktif-siparisler">
                <div className="row align-items-center">
                  <svg  width="40" height="40" viewBox="0 0 16 24" fill="white" className="col-2" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"/></svg>
                  <div className="admin-sidebar-link-text col-9">Aktif Siparişler</div>
                </div>
              </a>

            <a className='admin-sidebar-link' href="/kategoriler">
              <div className="row align-items-center">
                <svg width="40" height="40" fill="white" clipRule="evenodd" fillRule="evenodd"  className="col-3" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="m20.998 8.498h-17.996c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.558-.456-.998-1.001-.998zm-.964-3.017h-16.03c-.524 0-1.001.422-1.001 1.007 0 .081-.01.016.14 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.916c.058-.436.055-.426.055-.482 0-.671-.575-1.001-1.001-1.001h-14.024c-.536 0-1.001.433-1.001 1 0 .056-.004.043.055.483z" fillRule="nonzero"/></svg>
                <div className="admin-sidebar-link-text col-9">Kategoriler</div>
              </div>

            </a>
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