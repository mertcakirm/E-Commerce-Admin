import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mob_logo.png';
import './admin-css/admin-login.css';

const Admin_login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginDTO = {
      email: email,
      password: password
    };
    try {
      const response = await fetch('http://213.142.159.49:8000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDTO),
        credentials: 'include'
      });
        if (response.ok) {
          console.log([...response.headers.entries()]);
      } else {
        setErrorMessage("Giriş başarısız: Geçersiz kullanıcı adı veya parola.");
      }

    } catch (error) {
      console.error("There was an error!", error);
      setErrorMessage("Giriş başarısız: Şifre Yanlış.");
    }
  };

  return (
    <div className='admin-bg'>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className='form-admin' onSubmit={handleSubmit}>
              <img src={logo} className='logo2' alt="logo" />
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
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
              <button className='giris-yap-btn' type="submit">Giriş Yap</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_login;
