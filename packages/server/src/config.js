require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
});

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  app_secret: process.env.APP_SECRET,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT
  }
}