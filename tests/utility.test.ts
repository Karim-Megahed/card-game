const cardList = require('../src/utils/cardList')
const shuffle = require('../src/utils/shuffle')

test('cardList() returns full list of cards', () => {
    expect(cardList().length).toBe(52)
})

test('shuffle() returns same array size as it was given', () => {
    const cards = cardList();

    expect(shuffle(cards).length).toBe(cards.length)
})