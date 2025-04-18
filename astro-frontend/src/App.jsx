import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuth = localStorage.getItem('isAuth') === 'true';

  return (
    <BrowserRouter>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/" style={{ margin: '10px' }}>Регистрация</Link>
        <Link to="/login" style={{ margin: '10px' }}>Вход</Link>
        {isAuth && <Link to="/dashboard" style={{ margin: '10px' }}>Кабинет</Link>}
      </div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
