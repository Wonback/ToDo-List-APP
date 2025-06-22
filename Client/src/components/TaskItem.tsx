import { Tarea } from '../Types';
import '../styles/DeleteButton.css';
import '../styles/EditButton.css';
import '../styles/CheckboxStatus.css';
import BotonCambiarEstado from './BotonCambiarEstado';

interface TaskItemProps {
  tarea: Tarea;
  onEditar: (tarea: Tarea) => void;
  onEliminar: (id: number) => void;
  onToggle: (tarea: Tarea) => void;
}

const TaskItem = ({ tarea, onEditar, onEliminar, onToggle }: TaskItemProps) => {
  return (
    <div className="container-fluid">
      
        <li className='row align-items-center' style={{ listStyle: 'none' , marginBottom: '10px', paddingTop: '10px',paddingBottom: '10px', background: 'rgba(255,255,255,0.25)', boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '10px'}}>
          <div className="col-1">
            <BotonCambiarEstado id={`checkbox-${tarea.id}`} checked={tarea.completada} onChange={() => onToggle(tarea)}/>
          </div>
          <div className="col-8">
            <div  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <h3 style={{marginRight:'10px'}}><strong>{tarea.titulo}</strong></h3>
              <p style={{margin:'0'}}>(Prioridad {tarea.prioridad})</p>
            </div>
            
            <p>{tarea.descripcion}</p>
            <p><strong>Límite: </strong>{new Date(tarea.fechaLimite).toLocaleDateString()}</p>
            <p><strong>Estado: </strong>{tarea.completada ? '✅ Completada' : '❌ Pendiente'}</p>
          </div>
          <div className="col-3">
            <div className="row align-items-center">
              <div className='col-6'>
                <button onClick={() => onEliminar(tarea.id)} className="delete-button">
                <svg className="delete-svgIcon" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
                </button>
            </div>
            <div className='col-6'>
              <button onClick={() => onEditar(tarea)} className="edit-button">
              <svg className="edit-svgIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g></svg>
              </button>
            </div>
            </div>
            
            
          </div>
        </li>
      
    </div>
    
  );
};

export default TaskItem;