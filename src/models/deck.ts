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

export default Deck;
