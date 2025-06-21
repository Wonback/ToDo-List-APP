import { Tarea } from '../Types';

interface TaskItemProps {
  tarea: Tarea;
  onEditar: (tarea: Tarea) => void;
  onEliminar: (id: number) => void;
  onToggle: (tarea: Tarea) => void;
}

const TaskItem = ({ tarea, onEditar, onEliminar, onToggle }: TaskItemProps) => {
  return (
    <li>
      <strong>{tarea.titulo}</strong> - {tarea.descripcion} ({tarea.prioridad})<br />
      Límite: {new Date(tarea.fechaLimite).toLocaleDateString()}<br />
      Estado: {tarea.completada ? '✅ Completada' : '❌ Pendiente'}<br /><br />

      <div className="checkbox14">
        <input
          id={`checkbox-${tarea.id}`}
          type="checkbox"
          checked={tarea.completada}
          onChange={() => onToggle(tarea)}
        />
        <label htmlFor={`checkbox-${tarea.id}`}>
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

      <button onClick={() => onEditar(tarea)}>✏ Editar</button>{' '}
      <button onClick={() => onEliminar(tarea.id)}>🗑 Eliminar</button>
      <hr />
    </li>
  );
};

export default TaskItem;
