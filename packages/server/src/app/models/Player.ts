import { Sequelize, Model, Optional, DataTypes } from "sequelize"
import bcrypt from 'bcryptjs';
import { v1 as uuidv1 } from 'uuid';

import database from '../../config/database';

interface PlayerInterface {
  id?: string,
  playerId: string,
  name: string,
  email: string,
  score: number,
  level: number,
  password: string,
  isGuest?: true | false
  createdAt?: Date,
  updatedAt?: Date
  passwordHash?: string;
  passwordMatches?: true | false;
}

interface PlayerCreationAttributes extends Optional<PlayerInterface, "id" | "email" | "score" | "level" | "updatedAt" | "createdAt"> { }

interface PlayerInstance extends Model<PlayerInterface, PlayerCreationAttributes>, PlayerInterface { }

const sequelize = new Sequelize(database.database, database.username, database.password, {
  dialect: database.dialect,
  define: database.define
})

const Player = sequelize.define<PlayerInstance>("Player", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true
  },
  playerId: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 1,
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
  isGuest: {
    type: DataTypes.VIRTUAL,
    defaultValue: false
  },
  passwordHash: {
    type: DataTypes.VIRTUAL
  },
  passwordMatches: {
    type: DataTypes.VIRTUAL
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
}, {
  hooks: {
    async beforeCreate(player: PlayerInstance) {
      if (player.password) {
        player.password = await bcrypt.hash(player.password, 8)
        player.passwordHash = player.password;
      }
    },
    async beforeSave(player: PlayerInstance) {
      if (player.password) {
        player.passwordHash = player.password
      }
    }
  }
})

async function checkPassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash)
}

interface PlayerAttr {
  password: string, 
  email: string, 
  name?: string
}

async function createInstance(player: PlayerAttr | string, alreadyExists: true | false): Promise<PlayerInstance | null> {
  if (alreadyExists) {
    const _player = await Player.findOne({
      where: {
        email: player
      }
    })

    return _player
  }

  //creates a new player
  if (typeof player === 'object' && player.email && player.name) {
    const _player = await Player.create({
      playerId: uuidv1(),
      password: player.password,
      email: player.email,
      name: player.name
    })

    return _player
  }

  return null
}
// async function createInstance(alreadyExists: true | false, email: string): Promise<PlayerInstance | null>;

export { Player as default, createInstance, checkPassword };