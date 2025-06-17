import { Request, Response } from 'express';
import { Tarea } from '../models/Tarea';

export const crearTarea = async (req: Request, res: Response): Promise<void> => {
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
};

export const obtenerTareas = async (req: Request, res: Response): Promise<void> => {
  const usuarioId = (req as any).userId;

  try {
    const tareas = await Tarea.findAll({ where: { usuarioId } });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

export const actualizarTarea = async (req: Request, res: Response): Promise<void> => {
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
};

export const eliminarTarea = async (req: Request, res: Response): Promise<void> => {
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
};
