import { EXCLUDED_CARDS, ICard } from "../interfaces/card";
import { DECK_SHORT_AMOUNT, DECK_TYPE, IDeck } from "../interfaces/deck";
import { IDeckCard } from "../interfaces/deckCard";
import Card from "../models/card";
import DeckCard from "../models/deckCard";
const shuffle = require('../utils/shuffle')

export const isValidDeckData = (type: DECK_TYPE, shuffled: boolean) => {
    return  type !== DECK_TYPE.FULL && type !== DECK_TYPE.SHORT || shuffled === undefined
}

export const createCards = async (deck: IDeck) => {
    let cards: ICard[] = await Card.findAll({})

    cards = deck.type === DECK_TYPE.SHORT ? filterShortDeck(cards) : cards;
    
    cards = deck.shuffled ? shuffle(cards) : cards;

    cards.forEach((card: ICard) => DeckCard.create({card_id: card.id, deck_id: deck.id}))

    return cards;
}

const filterShortDeck = (cards: ICard[]) => {
   return cards.filter((card: ICard) => !EXCLUDED_CARDS.includes(card.value)).slice(0, DECK_SHORT_AMOUNT) 
}

export const getDeckCards = async (deck: IDeck) => {
    const deckCards: IDeckCard[] = await DeckCard.findAll({
        where: {deck_id: deck.id, drawn: false},
    });
    
    const cards: ICard[] = await Card.findAll({
        where: {id: deckCards.map((deckCard: IDeckCard) => deckCard.card_id)}
    })

    return cards;
}

export const setCardDrawnState = async(deck: IDeck, count: number) => {
    await DeckCard.update({drawn: true}, {
        where: {deck_id: deck.id, drawn: false},
        limit: count
    })
}