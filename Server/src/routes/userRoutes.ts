import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/perfil', authMiddleware, (req, res) => {
  const userId = (req as any).userId;
  res.json({ mensaje: 'Ruta protegida', userId });
});

export default router;
