const config = require('../config');

const db = config.db;

module.exports = {
    host: db.host,
    username: db.user,
    password: db.pass,
    database: db.name,
    dialect: db.dialect,
    logging: false,
    ssl: config.environment === 'production' ? true : false,
    dialectOptions: {
        ssl: config.environment === 'production' ? true : false
    },
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};
