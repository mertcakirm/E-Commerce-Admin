import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../API/AuthApi.js";
import { toast } from "react-toastify";
import logo from '../assets/mob_logo.png';
import { setCookie } from "../components/cookie/Cookie.js";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from "react-icons/fi";

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (!user.email.trim() || !user.password.trim()) {
            toast.warn("Lütfen tüm alanları doldurunuz.");
            return;
        }

        try {
            setLoading(true);
            const response = await LoginRequest(user);
            
            if (response?.data?.tokenString || response?.data?.token) {
                const token = response.data.tokenString || response.data.token;
                setCookie("token", token);
                toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
                navigate('/ana-panel');
            } else {
                toast.error('Giriş başarısız: Geçersiz kimlik bilgileri.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Giriş başarısız: E-posta veya şifre hatalı.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0f172a",
                backgroundImage: `
                    radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.12) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
                    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 100% 100%, 36px 36px, 36px 36px",
                padding: "1.5rem",
                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "440px",
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    padding: "2.75rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {/* LOGO & BAŞLIK */}
                <div className="text-center mb-4 w-100">
                    <div className="d-flex justify-content-center mb-3">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            style={{ 
                                maxHeight: "48px", 
                                maxWidth: "180px", 
                                objectFit: "contain" 
                            }} 
                        />
                    </div>
                    <h4 className="fw-bold text-dark m-0" style={{ letterSpacing: "-0.5px" }}>
                        Yönetim Paneli
                    </h4>
                    <p className="text-secondary mt-1 mb-0" style={{ fontSize: "0.88rem" }}>
                        Lütfen devam etmek için giriş yapınız.
                    </p>
                </div>

                {/* FORM ALANI */}
                <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
                    
                    {/* E-posta / Kullanıcı Adı */}
                    <div>
                        <label 
                            htmlFor="admin-username" 
                            className="form-label fw-semibold text-dark mb-1" 
                            style={{ fontSize: "0.85rem" }}
                        >
                            Yönetici E-Posta
                        </label>
                        <div className="position-relative">
                            <FiMail 
                                size={18} 
                                style={{
                                    position: "absolute",
                                    left: "14px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#94a3b8"
                                }}
                            />
                            <input
                                type="text"
                                id="admin-username"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="ornek@admin.com"
                                autoComplete="username"
                                style={{
                                    width: "100%",
                                    height: "46px",
                                    paddingLeft: "42px",
                                    paddingRight: "14px",
                                    borderRadius: "12px",
                                    border: "1px solid #cbd5e1",
                                    fontSize: "0.92rem",
                                    color: "#0f172a",
                                    outline: "none",
                                    transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#2563eb";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#cbd5e1";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </div>
                    </div>

                    {/* Şifre */}
                    <div>
                        <label 
                            htmlFor="admin-password" 
                            className="form-label fw-semibold text-dark mb-1" 
                            style={{ fontSize: "0.85rem" }}
                        >
                            Parola
                        </label>
                        <div className="position-relative">
                            <FiLock 
                                size={18} 
                                style={{
                                    position: "absolute",
                                    left: "14px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#94a3b8"
                                }}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="admin-password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                style={{
                                    width: "100%",
                                    height: "46px",
                                    paddingLeft: "42px",
                                    paddingRight: "42px",
                                    borderRadius: "12px",
                                    border: "1px solid #cbd5e1",
                                    fontSize: "0.92rem",
                                    color: "#0f172a",
                                    outline: "none",
                                    transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#2563eb";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.12)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#cbd5e1";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    color: "#94a3b8",
                                    cursor: "pointer",
                                    padding: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* GİRİŞ BUTONU */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            height: "48px",
                            backgroundColor: loading ? "#94a3b8" : "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: loading ? "none" : "0 4px 14px rgba(37, 99, 235, 0.35)",
                            transition: "background-color 0.15s ease, transform 0.1s ease",
                            marginTop: "0.5rem"
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#2563eb")}
                    >
                        {loading ? (
                            "Giriş Yapılıyor..."
                        ) : (
                            <>
                                <span>Giriş Yap</span>
                                <FiArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* ALT GÜVENLİK BİLGİLENDİRMESİ */}
                <div 
                    className="d-flex align-items-center justify-content-center gap-1 mt-4 text-muted"
                    style={{ fontSize: "0.78rem" }}
                >
                    <FiShield size={14} className="text-primary" />
                    <span>256-bit SSL Uçtan Uca Güvenli Bağlantı</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
