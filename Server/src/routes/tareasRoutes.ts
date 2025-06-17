import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea
} from '../controllers/tareaController';

const router = Router();

router.post('/', authMiddleware, crearTarea);
router.get('/', authMiddleware, obtenerTareas);
router.put('/:id', authMiddleware, actualizarTarea);
router.delete('/:id', authMiddleware, eliminarTarea);

export default router;
