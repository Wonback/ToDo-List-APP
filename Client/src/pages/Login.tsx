import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); 
      } else {
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  return (
    <div className="form5">
      <span>LogIn Form</span>
      <form onSubmit={handleLogin}>
        <div className="inputBox">
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="inputBox">
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">LogIn</button>
        <p>
          No tienes una cuenta? <Link to="/register" >Registrarse</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
