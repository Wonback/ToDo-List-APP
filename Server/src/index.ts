import express from 'express';
import cors from 'cors';
import { connectToDB } from './db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectToDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
