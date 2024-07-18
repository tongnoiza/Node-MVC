import  Sequelize  from 'sequelize'

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgresql://test:IdNxjxHOp50xdaNLSVVRB8N2Dr15hUJO@dpg-cqc9euuehbks738bfsqg-a.singapore-postgres.render.com/motorlog', {
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