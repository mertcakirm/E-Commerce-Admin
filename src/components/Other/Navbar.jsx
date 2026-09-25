import './css/Navbar.css';
import logo from '../../assets/mob_logo.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useMemo } from "react";
import { deleteCookie } from "../cookie/Cookie.js";
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
import { MdDashboard, MdLogout, MdClose, MdMenu } from "react-icons/md";
import NotificationButton from "./NotificationButton.jsx";

const NAV_ITEMS = [
    { to: "/ana-panel", label: "Ana Panel", icon: MdDashboard },
    { to: "/urunler", label: "Ürünler", icon: FaBoxOpen },
    { to: "/aktif-siparisler", label: "Aktif Siparişler", icon: FaShoppingCart },
    { to: "/kategoriler", label: "Kategoriler", icon: FaThLarge },
    { to: "/kullanicilar", label: "Kullanıcılar", icon: FaUsers },
    { to: "/kampanyalar", label: "Kampanyalar", icon: FaTags },
    { to: "/sayfalar", label: "Sayfa İçerikleri", icon: FaFileAlt },
    { to: "/soru-cevap", label: "Soru Cevap", icon: FaComments },
    { to: "/raporlar", label: "Finansal Durum", icon: FaCoins },
];

const QUICK_ACTIONS = [
    { to: "/hareketler", title: "Hareketler", icon: FaHistory },
    { to: "/mesajlar", title: "Mesajlar", icon: FaEnvelope },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const activeTitle = useMemo(() => {
        const path = location.pathname;
        const matched = NAV_ITEMS.find((item) => item.to === path);
        if (matched) return matched.label;
        const currentSegment = path.split("/").filter(Boolean).pop();
        return currentSegment ? currentSegment.replace(/-/g, " ") : "Yönetim Paneli";
    }, [location.pathname]);

    const handleLogOut = async () => {
        await deleteCookie("token");
        navigate('/');
    };

    return (
        <div id="sb-root-wrapper">
            {/* Mobil Üst Bar */}
            <header className="sb-mobile-topbar d-lg-none">
                <button
                    type="button"
                    className="sb-btn-reset sb-mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
                </button>
                <span className="sb-mobile-title">{activeTitle}</span>
                <div className="sb-mobile-actions">
                    <NotificationButton />
                </div>
            </header>

            {/* Mobil Karartma Overlay */}
            {mobileOpen && (
                <div 
                    className="sb-backdrop d-lg-none" 
                    onClick={() => setMobileOpen(false)} 
                />
            )}

            {/* Yan Menü (Sidebar) */}
            <aside className={`sb-aside-container ${mobileOpen ? "sb-is-open" : ""}`}>
                {/* 1. Logo ve Başlık */}
                <div className="sb-head-section">
                    <div className="sb-logo-box">
                        <img src={logo} alt="Logo" className="sb-logo-img img-fluid w-100" />
                    </div>
                    <div className="sb-active-indicator">
                        <span className="sb-badge-tag">Yönetim Paneli</span>
                        <h4 className="sb-current-page">{activeTitle}</h4>
                    </div>
                </div>

                {/* 2. Hızlı Butonlar (Hareketler, Mesajlar, Bildirimler) */}
                <div className="sb-quick-bar">
                    {QUICK_ACTIONS.map(({ to, title, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `sb-quick-btn ${isActive ? "sb-quick-active" : ""}`}
                            title={title}
                            onClick={() => setMobileOpen(false)}
                        >
                            <Icon size={18} />
                        </NavLink>
                    ))}
                    <div className="sb-notification-wrapper">
                        <NotificationButton />
                    </div>
                </div>

                {/* 3. Menü Linkleri */}
                <nav className="sb-navigation-area">
                    <span className="sb-section-label">Menü</span>
                    <ul className="sb-links-list">
                        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                            <li key={to} className="sb-menu-item">
                                <NavLink
                                    to={to}
                                    className={({ isActive }) => `sb-link-anchor ${isActive ? "sb-link-active" : ""}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon className="sb-link-icon" size={20} />
                                    <span className="sb-link-text">{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 4. Alt Çıkış Butonu */}
                <div className="sb-footer-box">
                    <button 
                        type="button" 
                        onClick={handleLogOut} 
                        className="sb-btn-reset sb-logout-action"
                    >
                        <MdLogout size={19} />
                        <span>Güvenli Çıkış</span>
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
