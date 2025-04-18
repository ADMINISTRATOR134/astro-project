import { useState } from "react";
import axios from "axios";

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        emailOrPhone,
        password,
        twoFactorCode,
      });

      setMessage('Успех! Добро пожаловать в личный кабинет.');

      // Сохраняем флаг авторизации в браузере
      localStorage.setItem('isAuth', 'true');

      // Перенаправляем пользователя в личный кабинет
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email или Телефон"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Код 2FA"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6c63ff',
            color: 'white',
            border: 'none',
            marginTop: '10px',
            cursor: 'pointer',
            borderRadius: '8px'
          }}
        >
          Войти
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;
