import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { Tarea } from '../models/Tarea';

const router = Router();

// ✅ Crear tarea
router.post('/', authMiddleware, async (req, res) => {
  const { titulo, descripcion, fechaLimite, prioridad } = req.body;
  const usuarioId = (req as any).userId;

  try {
    const nuevaTarea = await Tarea.create({
      titulo,
      descripcion,
      fechaLimite,
      prioridad,
      usuarioId,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// ✅ Obtener tareas del usuario
router.get('/', authMiddleware, async (req, res) => {
  const usuarioId = (req as any).userId;

  try {
    const tareas = await Tarea.findAll({ where: { usuarioId } });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// ✅ Actualizar tarea
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const usuarioId = (req as any).userId;

  try {
    const tarea = await Tarea.findOne({ where: { id, usuarioId } });
    if (!tarea) {
      res.status(404).json({ mensaje: 'Tarea no encontrada' });
      return;
    }

    await tarea.update(req.body);
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});


// ✅ Eliminar tarea
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const usuarioId = (req as any).userId;

  try {
    const tarea = await Tarea.findOne({ where: { id, usuarioId } });
    if (!tarea) {
      res.status(404).json({ mensaje: 'Tarea no encontrada' });
      return;
    }

    await tarea.destroy();
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});


export default router;
