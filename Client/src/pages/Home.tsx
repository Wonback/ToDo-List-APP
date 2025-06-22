import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import { Tarea } from '../Types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BotonAgregarTarea from '../components/BotonAgregarTarea';



const MySwal = withReactContent(Swal);

const Home = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const token = localStorage.getItem('token');

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

    if (token) obtenerTareas();
  }, [token]);

  const mostrarCrearTarea = async () => {
    const { value: formValues } = await MySwal.fire({
      title: 'Crear nueva tarea',
      html: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input id="titulo" className="swal2-input" placeholder="Título" />
          <input id="descripcion" className="swal2-input" placeholder="Descripción" />
          <select id="prioridad" className="swal2-input" defaultValue="media" style={{ margin: '20px 40px 3px' }}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
          <input id="fechaLimite" type="date" className="swal2-input" />
        </div>
      ),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      confirmButtonColor: 'rgb(45, 226, 90)',
      preConfirm: () => {
        const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const prioridad = (document.getElementById('prioridad') as HTMLSelectElement).value;
        const fechaLimite = (document.getElementById('fechaLimite') as HTMLInputElement).value;

        if (!titulo || !descripcion || !fechaLimite) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return;
        }

        return { titulo, descripcion, prioridad, fechaLimite };
      }
    });

    if (formValues) {
      const res = await fetch('http://localhost:3001/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        const nueva = await res.json();
        setTareas((prev) => [...prev, nueva]);
        Swal.fire('Tarea creada con éxito', '', 'success');
      } else {
        Swal.fire('Error', 'No se pudo crear la tarea', 'error');
      }
    }
  };

  const mostrarEditarTarea = async (tarea: Tarea) => {
    const { value: formValues } = await MySwal.fire({
      title: 'Editar tarea',
      html: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input id="titulo" className="swal2-input" defaultValue={tarea.titulo} placeholder="Título" />
          <input id="descripcion" className="swal2-input" defaultValue={tarea.descripcion} placeholder="Descripción" />
          <select id="prioridad" className="swal2-input" defaultValue={tarea.prioridad}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
          <input id="fechaLimite" type="date" className="swal2-input" defaultValue={tarea.fechaLimite.slice(0, 10)} />
        </div>
      ),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const prioridad = (document.getElementById('prioridad') as HTMLSelectElement).value;
        const fechaLimite = (document.getElementById('fechaLimite') as HTMLInputElement).value;

        if (!titulo || !descripcion || !fechaLimite) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return;
        }

        return { titulo, descripcion, prioridad, fechaLimite };
      }
    });

    if (formValues) {
      const res = await fetch(`http://localhost:3001/api/tareas/${tarea.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        const actualizada = await res.json();
        setTareas((prev) =>
          prev.map((t) => (t.id === tarea.id ? actualizada : t))
        );
        Swal.fire('Tarea actualizada con éxito', '', 'success');
      } else {
        Swal.fire('Error', 'No se pudo actualizar la tarea', 'error');
      }
    }
  };

  const eliminarTarea = async (id: number) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      const res = await fetch(`http://localhost:3001/api/tareas/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTareas((prev) => prev.filter((t) => t.id !== id));
        Swal.fire('Eliminada', 'La tarea fue eliminada correctamente.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo eliminar la tarea', 'error');
      }
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
      Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
    }
  };

  return (
    <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #fa466e, #415efa)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
      
      <BotonAgregarTarea onClick={mostrarCrearTarea} />
      

      <ul className="task-list" style={{marginTop: '0px', paddingTop: '10px', paddingLeft:'10vw',paddingRight:'10vw'}}>
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.id}
            tarea={tarea}
            onEditar={mostrarEditarTarea}
            onEliminar={eliminarTarea}
            onToggle={toggleCompletada}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
