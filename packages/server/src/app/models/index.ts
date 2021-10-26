'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
import config from '../../config/database';
const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter(file => {
  return /\w*\.(ts|js)$/.test(file) && file !== basename
}).forEach(file => {
  const Model = require(path.join(__dirname, file)).default;
  db[Model.name] = Model
})

module.exports = db;
