import { Dialect } from "sequelize/types";

const config = require('../config');
const { db } = config;

type databaseConfig = {
  host: string,
  username: string,
  password: string,
  database: string,
  dialect: Dialect,
  operatorsAliases: 0 | 1,
  logging: true | false,
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
  dialect: db.dialect || 'mysql',
  operatorsAliases: 0,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  } 
}

export default dbConfig;