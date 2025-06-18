import express from 'express';
import cors from 'cors';
import { connectToDB } from './db';
import authRoutes from './routes/authRoutes';
import { Usuario } from './models/Usuario';
import userRoutes from './routes/userRoutes';
import { Tarea } from './models/Tarea';
import tareasRoutes from './routes/tareasRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // ⬅️ incluye el middleware en rutas como /api/user/perfil
app.use('/api/tareas', tareasRoutes);

connectToDB().then(() => {
  Usuario.sync(); // crea la tabla si no existe
  Tarea.sync();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
