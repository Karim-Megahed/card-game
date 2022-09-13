module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cards', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        value: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        suit: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        code:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('cards')
    }
  }