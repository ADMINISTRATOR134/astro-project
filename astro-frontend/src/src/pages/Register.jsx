import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        phone,
        password
      });

      setMessage(`Успех! Ваш код 2FA: ${res.data.twoFactorCode}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email (или оставьте пустым)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Телефон (или оставьте пустым)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Зарегистрироваться
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

export default Register;
