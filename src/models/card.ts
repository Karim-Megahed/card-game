const { DataTypes } = require('sequelize')
import sequelize from '../../config/sequelize'

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  suit: {
      type: DataTypes.STRING,
      allowNull: true
  },
  code:{
      type: DataTypes.STRING,
      allowNull: true
  }
}, { 
   timestamps: false,
});

export default Card;
