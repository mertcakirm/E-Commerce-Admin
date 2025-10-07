import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Users from './pages/Users.jsx';
import Reports from "./pages/Reports.jsx";
import PageContents from './pages/PageContents.jsx';
import Categories from './pages/Categories.jsx';
import ActiveOrders from './pages/ActiveOrders.jsx';
import Messages from './pages/Messages.jsx';
import Offers from './pages/Offers.jsx';
import Login from './pages/Login.jsx';
import Sidebar from "./components/Other/Navbar.jsx";
import {ToastContainer} from "react-toastify";
import {getCookie} from "./components/cookie/Cookie.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Movements from "./pages/Movements.jsx";

const ProtectedRoute = ({element}) => {
    const session = getCookie("SESSIONID");
    return session ? element : <Navigate to="/" replace />;
};

const Layout = ({children}) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    return (
        <>
            {!isLoginPage && <Sidebar />}
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
                    <Route path="/" element={<Login />} />
                    <Route path="/urunler" element={<ProtectedRoute element={<Products />} />} />
                    <Route path="/genel" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/kullanicilar" element={<ProtectedRoute element={<Users />} />} />
                    <Route path="/raporlar" element={<ProtectedRoute element={<Reports />} />} />
                    <Route path="/sayfalar" element={<ProtectedRoute element={<PageContents />} />} />
                    <Route path="/kampanyalar" element={<ProtectedRoute element={<Offers />} />} />
                    <Route path="/kategoriler" element={<ProtectedRoute element={<Categories />} />} />
                    <Route path="/aktif-siparisler" element={<ProtectedRoute element={<ActiveOrders />} />} />
                    <Route path="/mesajlar" element={<ProtectedRoute element={<Messages />} />} />
                    <Route path="/hareketler" element={<ProtectedRoute element={<Movements />} />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;