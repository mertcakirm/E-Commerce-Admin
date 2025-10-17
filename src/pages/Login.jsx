import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginRequest} from "../API/AuthApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import logo from '../assets/mob_logo.png';
import './css/Login.css'
import {setCookie} from "../components/cookie/Cookie.js";
import LiquidEther from "../components/LibraryComp/LiquidEther.jsx";

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await LoginRequest(user);
            console.log(response)
            if (response.data) {
                setCookie("token", response.data.tokenString);
                navigate('/ana-panel');
            } else {
                toast.error('Giriş başarısız: Geçersiz kullanıcı adı veya parola.');
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('Giriş başarısız: Şifre yanlış.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    return (
        <div className='login-bg'>


            <div style={{ width: '100%', height: '100vh', position: 'absolute' }}>
                <LiquidEther
                    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <div className='col-12 d-flex align-items-center justify-content-center'>
                        <div className='form-admin' data-aos='fade-up'>
                            <img src={logo} className='w-50' alt='logo' />
                            <div className='form-item'>
                                <label htmlFor='admin-username'>Admin Adı</label>
                                <input
                                    type='text'
                                    id='admin-username'
                                    name='email'
                                    value={user.email}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='form-item'>
                                <label htmlFor='admin-password'>Parola</label>
                                <input
                                    type='password'
                                    id='admin-password'
                                    name='password'
                                    value={user.password}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <button onClick={handleSubmit} className='giris-yap-btn'>
                                Giriş Yap
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Login;