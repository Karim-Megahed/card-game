module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('decks_to_cards', {
        deck_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'decks',
            },
            key: 'id'
          },
        },
        card_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                  tableName: 'cards',
                },
                key: 'id'
              },
        },
        drawn: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
          },
      })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('decks_to_cards')
    }
  }