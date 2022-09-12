module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cards', list());
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cards', null, {});
  }
};

const suits = [
  'SPADES',
  'HEARTS',
  'CLUBS',
  'DIAMONDS'
];

const values = [
  'ACE',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'KING',
  'QUEEN',
  'JACK'
];

const list = () => {
  let list = [];

  for(let i = 0; i < values.length; i++){
      for(let j = 0; j < suits.length; j++){
          const value = values[i];
          const suit = suits[j];
          
          list.push({
              value: value,
              suit: suit,
              code: value.charAt(0) + suit.charAt(0)
          })
      }
  }

  return list;
}