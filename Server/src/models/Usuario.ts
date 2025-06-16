import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export interface UsuarioAttributes {
  id: number;
  apodo: string;
  email: string;
  password: string;
}

export interface UsuarioCreationAttributes
  extends Omit<UsuarioAttributes, 'id'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes {
  public id!: number;
  public apodo!: string;
  public email!: string;
  public password!: string;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    apodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false,
  }
);
