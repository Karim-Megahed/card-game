import { Request, Response } from 'express'
import Card from '../models/card';
import Deck from '../models/deck';
import { v4 as uuidv4 } from 'uuid';
import DeckCard from '../models/deckCard';
import shuffle from '../utils/shuffle'

export const getDecks = async (req: Request, res: Response) => {
    const decks = await Deck.findAll({});

    res.send(decks);
}

export const getDeck = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deck = await Deck.findOne({
        where: {id: id},  // include: Card
    });
    const deckCards = await DeckCard.findAll({
        where: {deck_id: deck.id, drawn: false},
    });
    const cards = await Card.findAll({
        where: {id: deckCards.map((deckCard) => deckCard.card_id)}
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
    const { type, shuffled } = req.body;
    
    const deck = await Deck.create({type, shuffled, uuid: uuidv4()})
    let cards = await Card.findAll({limit: type == 'FULL' ? 52 : 32})
    cards = shuffled ? shuffle(cards) : cards;

    cards.forEach((card) => DeckCard.create({card_id: card.id, deck_id: deck.id}))
    
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
    console.log(count, id);
    
    const deck = await Deck.findOne({
        where: {id: id},  
    });
    const deckCards = await DeckCard.findAll({
        where: {deck_id: deck.id, drawn: false},
        limit: count
    });

    await DeckCard.update({drawn: true}, {
        where: {deck_id: deck.id, drawn: false},
        limit: count
    })

    const cards = await Card.findAll({
        where: {id: deckCards.map((deckCard) => deckCard.card_id)},
    })

    res.status(200).send(cards)
}