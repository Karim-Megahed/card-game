import sequelize from '../utils/sequelize'
const { DataTypes } = require('sequelize')

const Deck = sequelize.define('Deck', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
 
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
//   Deck.hasMany(models.Card);
// };

export default Deck;
