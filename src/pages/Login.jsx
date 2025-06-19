import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginRequest} from "../API/AuthApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import logo from '../assets/mob_logo.png';
import './css/Login.css'

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
            if (response.ok) {
                console.log([...response.headers.entries()]);
                navigate('/genel');
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
        <div className='admin-bg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='form-admin' data-aos='fade-up'>
                            <img src={logo} className='logo2' alt='logo' />
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
        </div>
    );
};

export default Login;