import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Admin_anasayfa from './pages/admin-anasayfa';
import Admin_product from './pages/admin-product';
import Admin_users from './pages/admin-users';
import Admin_raporlar from './pages/admin-raporlar';
import Admin_sayfalar from './pages/admin-sayfalar';
import Admin_kategoriler from './pages/admin-kategoriler';
import Admin_aktif_siparis from './pages/admin-aktif-siparis';
import Admin_mesajlar from './pages/admin-mesajlar';
import Admin_kampanyalar from './pages/admin-kampanyalar';
import Admin_login from './pages/admin-login';
import {getCookie} from "./components/cookie/cookie.js";
import Admin_sidebar from "./components/admin-sidebar.jsx";
import {ToastContainer} from "react-toastify";

const ProtectedRoute = ({element}) => {
    const session = getCookie("SESSIONID");
    return session ? element : <Navigate to="/" replace />;
};

const Layout = ({children}) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    return (
        <>
            {!isLoginPage && <Admin_sidebar />}
            <div className={!isLoginPage ? "admin-page-content" : ""}>
                {children}
            </div>
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <ToastContainer theme="colored" closeOnClick position="bottom-right" autoClose={3000} />
            <Layout>
                <Routes>
                    <Route path="/" element={<Admin_login />} />
                    <Route path="/urunler" element={<ProtectedRoute element={<Admin_product />} />} />
                    <Route path="/genel" element={<ProtectedRoute element={<Admin_anasayfa />} />} />
                    <Route path="/kullanicilar" element={<ProtectedRoute element={<Admin_users />} />} />
                    <Route path="/raporlar" element={<ProtectedRoute element={<Admin_raporlar />} />} />
                    <Route path="/sayfalar" element={<ProtectedRoute element={<Admin_sayfalar />} />} />
                    <Route path="/kampanyalar" element={<ProtectedRoute element={<Admin_kampanyalar />} />} />
                    <Route path="/kategoriler" element={<ProtectedRoute element={<Admin_kategoriler />} />} />
                    <Route path="/aktif-siparisler" element={<ProtectedRoute element={<Admin_aktif_siparis />} />} />
                    <Route path="/mesajlar" element={<ProtectedRoute element={<Admin_mesajlar />} />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;