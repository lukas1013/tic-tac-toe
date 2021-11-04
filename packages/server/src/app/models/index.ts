'use strict';

import fs from 'fs';
import path from 'path';
const basename = path.basename(__filename);
const db: any = {};

fs.readdirSync(__dirname).filter(file => {
  return /\w*\.(ts|js)$/.test(file) && file !== basename
}).forEach(file => {
  const Model = require(path.join(__dirname, file)).default;
  db[Model.name] = Model
})

module.exports = db;
