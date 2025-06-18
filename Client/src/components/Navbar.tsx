import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>📝 To-Do App</span>

      <div style={styles.links}>
        {!isAuthenticated && location.pathname !== '/login' && (
          <Link to="/login" style={styles.link}>Iniciar sesión</Link>
        )}
        {!isAuthenticated && location.pathname !== '/register' && (
          <Link to="/register" style={styles.link}>Registrarse</Link>
        )}
        {isAuthenticated && (
          <>
            <Link to="/home" style={styles.link}>Mis tareas</Link>
            <button onClick={logout} style={styles.logout}>Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  brand: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  links: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  } as React.CSSProperties,
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '6px 12px',
    background: '#555',
    borderRadius: '4px',
  },
  logout: {
    color: '#fff',
    background: '#e74c3c',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;
