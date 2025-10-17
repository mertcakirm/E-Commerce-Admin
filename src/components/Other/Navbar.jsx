import './css/Navbar.css';
import logo from '../../assets/mob_logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {deleteCookie} from "../cookie/Cookie.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
    FaBoxOpen,
    FaShoppingCart,
    FaThLarge,
    FaUsers,
    FaTags,
    FaFileAlt,
    FaHistory,
    FaEnvelope,
    FaCoins,
    FaComments
} from "react-icons/fa";
import NotificationButton from "./NotificationButton.jsx";
import {MdArrowForwardIos, MdDashboard} from "react-icons/md";

const Navbar = () => {
    const navigate = useNavigate();

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.admin-sidebar-parent');
        if (!sidebar) return;

        if (sidebar.classList.contains('w-100')) {
            sidebar.classList.remove('w-100');
            sidebar.classList.add('collapsed');
        }
        else {
            sidebar.classList.add('w-100');
            sidebar.classList.remove('collapsed');
        }
    };

    const LogOut = async () => {
        await deleteCookie("token")
        navigate('/');
    };
    const url = window.location.pathname.split("/").filter(Boolean).pop();

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className="position-fixed" style={{zIndex:9998}}>
            {/* NAVBAR */}
            <div className="admin-navbar">
                <div className="d-flex  w-100 justify-content-between">
                    <h3 className="navbar-title align-items-center gap-3 d-flex m-0">
                        <div className="fs-6">Yönetim Paneli</div>
                        <MdArrowForwardIos size={20} color="white" />
                        <div className="fs-6">{url.toUpperCase()}</div>
                    </h3>
                    <div className="d-flex align-items-center gap-4  justify-content-end">
                        <a className="nav-top-btn" href="/hareketler">
                            <FaHistory size={20} color="white" />
                        </a>
                        <a className="nav-top-btn" href="/mesajlar">
                            <FaEnvelope size={20} color="white" />
                        </a>
                        <NotificationButton/>
                        <button onClick={LogOut} className="navbar-logout">Çıkış Yap</button>
                    </div>

                </div>
            </div>
            {/* SIDEBAR */}
            <div className="admin-sidebar-parent" data-aos="fade-in">
                <div className='admin-sidebar-logo-part'>
                    <img src={logo} className='img-fluid logo' alt=""/>
                </div>
                <div className='admin-sidebar-links'>
                    <Link
                        className={`admin-sidebar-link ${url === "ana-panel" ? "active-link" : ""}`}
                        to="/ana-panel"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "ana-panel" ? "link-stick" : ""}`}></div>
                            <MdDashboard size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Ana Panel</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "urunler" ? "active-link" : ""}`}
                        to="/urunler"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "urunler" ? "link-stick" : ""}`}></div>
                            <FaBoxOpen size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Ürünler</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "aktif-siparisler" ? "active-link" : ""}`}
                        to="/aktif-siparisler"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "aktif-siparisler" ? "link-stick" : ""}`}></div>
                            <FaShoppingCart size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Aktif Siparişler</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "kategoriler" ? "active-link" : ""}`}
                        to="/kategoriler"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "kategoriler" ? "link-stick" : ""}`}></div>
                            <FaThLarge size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Kategoriler</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "kullanicilar" ? "active-link" : ""}`}
                        to="/kullanicilar"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "kullanicilar" ? "link-stick" : ""}`}></div>
                            <FaUsers size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Kullanıcılar</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "kampanyalar" ? "active-link" : ""}`}
                        to="/kampanyalar"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "kampanyalar" ? "link-stick" : ""}`}></div>
                            <FaTags size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Kampanyalar</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "sayfalar" ? "active-link" : ""}`}
                        to="/sayfalar"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "sayfalar" ? "link-stick" : ""}`}></div>
                            <FaFileAlt size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Sayfa İçerikleri</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "soru-cevap" ? "active-link" : ""}`}
                        to="/soru-cevap"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "soru-cevap" ? "link-stick" : ""}`}></div>
                            <FaComments size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Soru Cevap</div>
                        </div>
                    </Link>

                    <Link
                        className={`admin-sidebar-link ${url === "raporlar" ? "active-link" : ""}`}
                        to="/raporlar"
                    >
                        <div className="links-row align-items-center">
                            <div className={`${url === "raporlar" ? "link-stick" : ""}`}></div>
                            <FaCoins size={24} color="white" />
                            <div className="admin-sidebar-link-text p-0">Finansal Durum</div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mobile-nav">
                <div className="d-flex  w-100 justify-content-between">
                    <button onClick={toggleSidebar} className="btn">
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 17.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
                    </button>
                    <div className="d-flex-justify-content-end">
                        <NotificationButton/>
                        <button onClick={LogOut} className="navbar-logout">Çıkış Yap</button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Navbar;