import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import Card from '../models/card';
import Deck from '../models/deck';
import DeckCard from '../models/deckCard';
import shuffle from '../utils/shuffle'
import { IDeck, DECK_TYPE, DECK_FULL_AMOUNT, DECK_HALF_AMOUNT } from '../interfaces/deck'
import { ICard } from '../interfaces/card'
import { IDeckCard } from '../interfaces/deckCard'

export const getDecks = async (req: Request, res: Response) => {
    const decks = await Deck.findAll({});

    res.send(decks);
}

export const getDeck = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deck: IDeck = await Deck.findOne({
        where: {id: id},  // include: Card
    });
    const deckCards: IDeckCard[] = await DeckCard.findAll({
        where: {deck_id: deck.id, drawn: false},
    });
    const cards: ICard[] = await Card.findAll({
        where: {id: deckCards.map((deckCard: IDeckCard) => deckCard.card_id)}
    })

    res.status(200).send({
        id: deck.uuid, 
        type: deck.type, 
        shuffled: deck.shuffled, 
        remaining: cards.length,
        cards: cards
    });
}

export const createDeck = async (req: Request, res: Response) => {
    const { type, shuffled }: { type: DECK_TYPE, shuffled: boolean } = req.body;

    const numberOfCards: number = type === DECK_TYPE.FULL ? DECK_FULL_AMOUNT : DECK_HALF_AMOUNT
    const deck: IDeck = await Deck.create({type, shuffled, uuid: uuidv4()})
    let cards: ICard[] = await Card.findAll({limit: numberOfCards})
    cards = shuffled ? shuffle(cards) : cards;

    cards.forEach((card: ICard) => DeckCard.create({card_id: card.id, deck_id: deck.id}))
    
    res.status(201).send({
        id: deck.uuid, 
        type: deck.type, 
        shuffled: deck.shuffled, 
        remaining: cards.length,
    });
}

export const drawDeckCards = async (req: Request, res: Response) => {
    const { count } = req.body;
    const { id } = req.params;
    
    const deck: IDeck = await Deck.findOne({
        where: {id: id},  
    });
    const deckCards: IDeckCard[] = await DeckCard.findAll({
        where: {deck_id: deck.id, drawn: false},
        limit: count
    });

    await DeckCard.update({drawn: true}, {
        where: {deck_id: deck.id, drawn: false},
        limit: count
    })

    const cards: ICard[] = await Card.findAll({
        where: {id: deckCards.map((deckCard: IDeckCard) => deckCard.card_id)},
    })

    res.status(200).send(cards)
}