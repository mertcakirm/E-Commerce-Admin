import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import logo from '../assets/mob_logo.png';
import './css/Login.css';
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import {LoginRequest} from "../API/AuthApi.js";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const loginDTO = {
            email: email,
            password: password
        };
        try {
            const response = await LoginRequest(loginDTO);
            if (response.ok) {
                console.log([...response.headers.entries()]);
                navigate('/genel')
            } else {
                toast.error("Giriş başarısız: Geçersiz kullanıcı adı veya parola.")
            }
        } catch (error) {
            console.error("There was an error!", error);
            toast.error("Giriş başarısız: Şifre Yanlış.")
        }
    };
    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className='admin-bg'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className='form-admin' data-aos="fade-up">
                            <img src={logo} className='logo2' alt="logo"/>
                            <div className="form-item">
                                <label htmlFor="admin-username">Admin Adı</label>
                                <input
                                    type="text"
                                    id='admin-username'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="admin-password">Parola</label>
                                <input
                                    type="password"
                                    id='admin-password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handleSubmit} className='giris-yap-btn'>Giriş Yap</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
