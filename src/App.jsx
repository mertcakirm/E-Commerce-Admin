import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Admin_anasayfa from './pages/admin-anasayfa'
import Admin_product from './pages/admin-product';
import Admin_product_detail from './pages/admin-product-detail';
import Admin_users from './pages/admin-users';
import Admin_raporlar from './pages/admin-raporlar';
import Admin_sayfalar from './pages/admin-sayfalar';
import Admin_kategoriler from './pages/admin-kategoriler';
import Admin_aktif_siparis from './pages/admin-aktif-siparis';
import Admin_mesajlar from './pages/admin-mesajlar';
import Admin_kampanyalar from './pages/admin-kampanyalar';
import Admin_login from './pages/admin-login';
import {getCookie} from "./components/cookie/cookie.js";


function App() {
    const ProtectedRoute = ({element}) => {
        const session = getCookie("SESSIONID")
        if (session) {
            return session ? element : <Navigate to="/" replace/>;

        }
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Admin_login/>}/>
                    <Route path="/urunler" element={<ProtectedRoute element={<Admin_product/>}/>}/>
                    <Route path="/urunler-guncelle/:id" element={<ProtectedRoute element={<Admin_product_detail/>}/>}/>
                    <Route path="/genel" element={<ProtectedRoute element={<Admin_anasayfa/>}/>}/>
                    <Route path="/kullanicilar" element={<ProtectedRoute element={<Admin_users/>}/>}/>
                    <Route path="/raporlar" element={<ProtectedRoute element={<Admin_raporlar/>}/>}/>
                    <Route path="/sayfalar" element={<ProtectedRoute element={<Admin_sayfalar/>}/>}/>
                    <Route path="/kampanyalar" element={<ProtectedRoute element={<Admin_kampanyalar/>}/>}/>
                    <Route path="/kategoriler" element={<ProtectedRoute element={<Admin_kategoriler/>}/>}/>
                    <Route path="/aktif-siparisler" element={<ProtectedRoute element={<Admin_aktif_siparis/>}/>}/>
                    <Route path="/mesajlar" element={<ProtectedRoute element={<Admin_mesajlar/>}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
