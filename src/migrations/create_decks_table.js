module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('decks', {
        id: {
          type: Sequelize.DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        shuffled: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        },
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('decks')
    }
  }