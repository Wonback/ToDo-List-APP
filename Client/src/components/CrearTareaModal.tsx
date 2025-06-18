import React from 'react';

interface Props {
  titulo: string;
  descripcion: string;
  prioridad: string;
  fechaLimite: string;
  setTitulo: (v: string) => void;
  setDescripcion: (v: string) => void;
  setPrioridad: (v: string) => void;
  setFechaLimite: (v: string) => void;
  crearTarea: (e: React.FormEvent) => void;
  cerrar: () => void;
}

const CrearTareaModal = ({
  titulo,
  descripcion,
  prioridad,
  fechaLimite,
  setTitulo,
  setDescripcion,
  setPrioridad,
  setFechaLimite,
  crearTarea,
  cerrar,
}: Props) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={cerrar}>✖</button>
        <h3>Crear nueva tarea</h3>
        <form onSubmit={crearTarea}>
          <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required /><br />
          <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required /><br />
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select><br />
          <input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required /><br />
          <button type="submit">Crear tarea</button>
        </form>
      </div>
    </div>
  );
};

export default CrearTareaModal;
