const { sequelize } = require('sequelize'); // Import Sequelize
require('ts-node').register(); // Register ts-node to compile TypeScript at runtime

module.exports = {
  development: {
    dialect: 'mysql',
    username: 'root',
    password: null,
    database: 'sequelize_mysql_api',
    host: 'localhost',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: false,
  },
};
