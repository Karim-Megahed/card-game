module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cards', cardList());
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

const cardList = () => {
  let list = [];

  suits.forEach(suit => {
    values.map(value => {
     return list.push({
        value: value,
        suit: suit,
        code: value.charAt(0) + suit.charAt(0)
    })
    })
  })

  return list;
}