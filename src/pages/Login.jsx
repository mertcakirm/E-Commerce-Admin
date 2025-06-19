import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mob_logo.png';
import './css/Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import { LoginRequest } from '../API/AuthApi.js';

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