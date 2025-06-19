import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [apodo, setApodo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apodo, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Usuario registrado con éxito');
        navigate('/login');
      } else {
        alert(data.mensaje || 'Error al registrar usuario');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    

    <div className="form5">
      <span>Registro</span>
      <form onSubmit={handleRegister}>
        <div className="inputBox">
          <input type="text" placeholder="Apodo" value={apodo} onChange={(e) => setApodo(e.target.value)} required />
        </div>

        <div className="inputBox">
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="inputBox">
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Crear</button>
        <p>
          Ya estás registrado? <Link to="/login" >Iniciar Sesion</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
