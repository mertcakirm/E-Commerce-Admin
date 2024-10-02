import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/mob_logo.png';
import './admin-css/admin-login.css';

const Admin_login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://213.142.159.49:8083/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok && responseData.token) {
        localStorage.setItem('token', responseData.token);
        await sleep(500)
        navigate('/genel');
      } else {
        setErrorMessage("Giriş başarısız: Geçersiz kullanıcı adı veya parola.");
        navigate('/genel');

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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
