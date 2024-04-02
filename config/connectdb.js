import  Sequelize  from 'sequelize'

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgres://log_2l63_user:TefO3Xp3ufB9q0VlYZP9oPRDvJLc6IKB@dpg-co5nh2e3e1ms73b8uha0-a.singapore-postgres.render.com/log_2l63', {
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