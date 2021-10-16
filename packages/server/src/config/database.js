const config = require('../config');
const { db } = config;

module.exports = {
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