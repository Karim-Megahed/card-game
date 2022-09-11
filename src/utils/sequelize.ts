const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('game', 'root', 'ampler25', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize;