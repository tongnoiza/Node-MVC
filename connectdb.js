import  Sequelize  from 'sequelize'

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgresql://loging_user:HYAvEhKqwrYISdNMksRedWYLKesOhxNT@dpg-cqc8lv56l47c73cvneug-a.singapore-postgres.render.com/loging', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: { ssl: {
        require: 'true'
      }}, 
  }) 

// const sequelize = new Sequelize('test', 'root', '', {
//   host: 'localhost',
//   dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// })

try {

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export default sequelize
// Exampl