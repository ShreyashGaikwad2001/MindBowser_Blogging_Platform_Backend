
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,       // Maximum number of connections in pool
      min: 0,       // Minimum number of connections in pool
      acquire: 30000, // The maximum time (ms) Sequelize will try to get a connection before throwing error
      idle: 10000    // The maximum time (ms) a connection can be idle before being released
    }
  }
);

// Optional: Test DB connection when app starts
sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ DB connection failed:', err));

module.exports = sequelize;
