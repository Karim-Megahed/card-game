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
  return suits.flatMap(suit => {
    return values.map(value => ({
         value: value,
         suit: suit,
         code: value.charAt(0) + suit.charAt(0)
     }))
   })
 }