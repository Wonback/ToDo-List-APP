import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida con la base de datos');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};
