import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { ToastContainer } from "react-toastify";
import { getCookie } from "./components/cookie/Cookie.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Movements from "./pages/Movements.jsx";
import Questions from "./pages/Questions.jsx";

// 🔒 ProtectedRoute: Token yoksa login sayfasına yönlendirir
const ProtectedRoute = ({ children }) => {
    const token = getCookie("token");
    return token ? children : <Navigate to="/" replace />;
};

// 📄 Layout: Login sayfasında sidebar gizlenir
const Layout = ({ children }) => {
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
            <ToastContainer theme="colored" closeOnClick position="bottom-center" autoClose={3000} />
            <Layout>
                <Routes>
                    {/* Giriş sayfası */}
                    <Route path="/" element={<Login />} />

                    {/* Korumalı sayfalar */}
                    <Route
                        path="/urunler"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/ana-panel"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/kullanicilar"
                        element={
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/raporlar"
                        element={
                            <ProtectedRoute>
                                <Reports />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sayfalar"
                        element={
                            <ProtectedRoute>
                                <PageContents />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/kampanyalar"
                        element={
                            <ProtectedRoute>
                                <Offers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/kategoriler"
                        element={
                            <ProtectedRoute>
                                <Categories />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/aktif-siparisler"
                        element={
                            <ProtectedRoute>
                                <ActiveOrders />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/mesajlar"
                        element={
                            <ProtectedRoute>
                                <Messages />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hareketler"
                        element={
                            <ProtectedRoute>
                                <Movements />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/soru-cevap"
                        element={
                            <ProtectedRoute>
                                <Questions />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;