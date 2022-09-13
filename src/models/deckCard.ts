import sequelize from '../utils/sequelize'

const { DataTypes } = require('sequelize')

const DeckCard = sequelize.define('decks_to_cards', {
    deck_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      drawn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, 
    { timestamps: false }
);

// Deck.belongsToMany(Card, {through: DeckCards, timestamps: false});

export default DeckCard;