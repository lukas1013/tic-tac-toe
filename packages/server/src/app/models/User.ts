import { Sequelize, Model, Optional, DataTypes } from "sequelize"
import database from '../../config/database';

interface UserAttributes {
  id?: string,
  playerId: string,
  player: string,
  email: string,
  password: string,
  createdAt?: Date,
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "email" | "updatedAt" | "createdAt"> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = new Sequelize(database.database,database.username,database.password, {
  dialect: database.dialect,
  define: database.define
}).define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true
  },
  playerId: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
  player: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
})

export default User;