import { Dialect } from 'sequelize/types';
import config from '../config';
const { db } = config;

type databaseConfig = {
  host: string,
  username: string,
  password: string,
  database: string,
  dialect: Dialect,
  logging: true | false,
  ssl?: true | false,
  dialectOptions: {
    ssl?: true | false
  },
  define: {
    timestamps: true | false,
    underscored: true | false,
    underscoredAll: true | false
  }
}

const dbConfig: databaseConfig = {
  host: db.host,
  username: db.user,
  password: db.pass,
  database: db.name,
  dialect: db.dialect as 'mysql' | 'mariadb',
  logging: false,
  ssl: config.environment === 'production' ? true :false,
  dialectOptions: {
    ssl: config.environment === 'production' ? true :false
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  } 
}

export default dbConfig;