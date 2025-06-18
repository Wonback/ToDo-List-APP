import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Apodo"
          value={apodo}
          onChange={(e) => setApodo(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
