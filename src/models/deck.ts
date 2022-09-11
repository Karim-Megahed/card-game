import Card from "./card";
import sequelize from '../../config/sequelize'
const { DataTypes } = require('sequelize')

const Deck = sequelize.define('Deck', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shuffled: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, { 
   timestamps: false,
});

// Deck.belongsToMany(Card, {through: 'decks_to_cards', timestamps: false});
// const DecksCards = sequelize.define('decks_to_cards', {}, { timestamps: false });

// Deck.associate = models => {
//   Deck.hasMAny(models.Card);
// };

export default Deck;
