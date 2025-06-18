import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Asegúrate de tener este CSS para estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // guardar token
        navigate('/home');
      } else {
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <span className="login-title">LogIn Form</span>
        <form onSubmit={handleLogin}>
          <div className="inputBox">
            <input
              type="email"
              id="form5-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="form5-email">Email or Username</label>
          </div>
          <div className="inputBox">
            <input
              type="password"
              id="form5-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="form5-password">Password</label>
          </div>
          <button type="submit">LogIn</button>
          <p>
            Don't have an account?
            <a href="/register"> Create one </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
