import React, { useEffect, useState } from 'react';
import CrearTareaModal from '../components/CrearTareaModal';
import EditarTareaModal from '../components/EditarTareaModal';
import { Tarea } from '../Types';
import '../styles/Home.css'; 


const Home = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [fechaLimite, setFechaLimite] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);

  const token = localStorage.getItem('token');

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    
    const obtenerTareas = async () => {
      const res = await fetch('http://localhost:3001/api/tareas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setTareas(data);
      }
    };

    obtenerTareas();
  }, [token]);

  const crearTarea = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        prioridad,
        fechaLimite,
      }),
    });

    if (res.ok) {
      const nueva = await res.json();
      setTareas([...tareas, nueva]);
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
      setFechaLimite('');
      setMostrarModal(false);
    } else {
      alert('Error al crear tarea');
    }
  };

  const handleGuardarCambios = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tareaEditando) return;

    const res = await fetch(`http://localhost:3001/api/tareas/${tareaEditando.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, descripcion, prioridad, fechaLimite }),
    });

    if (res.ok) {
      const actualizada = await res.json();
      setTareas((prev) =>
        prev.map((t) => (t.id === tareaEditando.id ? actualizada : t))
      );
      setTareaEditando(null);
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
      setFechaLimite('');
    } else {
      alert('Error al actualizar tarea');
    }
  };

  const eliminarTarea = async (id: number) => {
    const res = await fetch(`http://localhost:3001/api/tareas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } else {
      alert('Error al eliminar tarea');
    }
  };

  const toggleCompletada = async (tarea: Tarea) => {
    const res = await fetch(`http://localhost:3001/api/tareas/${tarea.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completada: !tarea.completada,
      }),
    });

    if (res.ok) {
      setTareas((prev) =>
        prev.map((t) =>
          t.id === tarea.id ? { ...t, completada: !t.completada } : t
        )
      );
    } else {
      alert('Error al cambiar estado');
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <button onClick={() => setMostrarModal(true)}>+ Nueva tarea</button>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <strong>{tarea.titulo}</strong> - {tarea.descripcion} ({tarea.prioridad})<br />
            Límite: {new Date(tarea.fechaLimite).toLocaleDateString()}<br />
            Estado: {tarea.completada ? '✅ Completada' : '❌ Pendiente'}<br /><br />

                      <div className="checkbox14">
                <input 
                  id="checkbox14-input" 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={handleCheckboxChange} 
                />
                <label htmlFor="checkbox14-input">
                  <div className="flip">
                    <div className="front"></div>
                    <div className="back">
                      <svg viewBox="0 0 16 14">
                        <path d="M2 8.5L6 12.5L14 1.5"></path>
                      </svg>
                    </div>
                  </div>
                </label>
              </div>

            <button onClick={() => {
              setTareaEditando(tarea);
              setTitulo(tarea.titulo);
              setDescripcion(tarea.descripcion);
              setPrioridad(tarea.prioridad);
              setFechaLimite(tarea.fechaLimite.slice(0, 10));
            }}>
              ✏ Editar
            </button>{' '}

            <button onClick={() => eliminarTarea(tarea.id)}>🗑 Eliminar</button>
            <hr />
          </li>
        ))}
      </ul>

      {mostrarModal && (
        <CrearTareaModal
          titulo={titulo}
          descripcion={descripcion}
          prioridad={prioridad}
          fechaLimite={fechaLimite}
          setTitulo={setTitulo}
          setDescripcion={setDescripcion}
          setPrioridad={setPrioridad}
          setFechaLimite={setFechaLimite}
          crearTarea={crearTarea}
          cerrar={() => setMostrarModal(false)}
        />
      )}

      {tareaEditando && (
        <EditarTareaModal
          tarea={tareaEditando}
          titulo={titulo}
          descripcion={descripcion}
          prioridad={prioridad}
          fechaLimite={fechaLimite}
          setTitulo={setTitulo}
          setDescripcion={setDescripcion}
          setPrioridad={setPrioridad}
          setFechaLimite={setFechaLimite}
          guardarCambios={handleGuardarCambios}
          cerrar={() => setTareaEditando(null)}
        />
      )}
    </div>
  );
};

export default Home;
