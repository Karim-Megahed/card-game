module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('decks', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        uuid: {
          type: Sequelize.DataTypes.STRING,
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