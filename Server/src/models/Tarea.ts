import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { Usuario } from './Usuario';

export interface TareaAttributes {
  id: number;
  titulo: string;
  descripcion?: string;
  completada: boolean;
  fechaLimite?: Date;
  prioridad: 'baja' | 'media' | 'alta';
  usuarioId: number;
}

export interface TareaCreationAttributes
  extends Omit<TareaAttributes, 'id' | 'completada'> {} // ✅ eliminamos ambos como obligatorios

export class Tarea extends Model<TareaAttributes, TareaCreationAttributes>
  implements TareaAttributes {
  public id!: number;
  public titulo!: string;
  public descripcion?: string;
  public completada!: boolean;
  public fechaLimite?: Date;
  public prioridad!: 'baja' | 'media' | 'alta';
  public usuarioId!: number;
}

Tarea.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // ✅ se asigna automáticamente si no se envía
    },
    fechaLimite: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.ENUM('baja', 'media', 'alta'),
      allowNull: false,
      defaultValue: 'media',
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tarea',
    tableName: 'tareas',
    timestamps: true,
  }
);

// Relaciones
Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });
