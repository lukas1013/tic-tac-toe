import { Sequelize } from 'sequelize';
import database from '../config/database';

const sequelize = new Sequelize(database.database, database.username, database.password, {
  dialect: database.dialect,
  define: database.define
})

sequelize.authenticate()
  .then(() => sequelize.sync())
  .catch(err => console.log('Unable to connect to the database', err))

export default sequelize