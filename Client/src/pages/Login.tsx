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
    <div className="form5">
      <span>LogIn Form</span>
      <form onSubmit={handleLogin} action="">
        <div className="inputBox">
          <input type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)} required id="form5-email" />
          
        </div>
        <div className="inputBox">
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required id="form5-password" />
        
        </div>
        <button type="submit">LogIn</button>
        <p>
          No tienes una cuenta?
          <a href="/#">
            Crea una cuenta
          </a>
        </p>
      </form>
    </div>

  );
};

export default Login;
