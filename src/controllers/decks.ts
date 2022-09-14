import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import Card from '../models/card';
import Deck from '../models/deck';
import DeckCard from '../models/deckCard';
import shuffle from '../utils/shuffle'
import { IDeck, DECK_TYPE, DECK_FULL_AMOUNT, DECK_SHORT_AMOUNT } from '../interfaces/deck'
import { ICard, EXCLUDED_CARDS } from '../interfaces/card'
import { IDeckCard } from '../interfaces/deckCard'

export const getDeck = async (req: Request, res: Response) => {
    const id: string = req.params.id

    const deck: IDeck = await Deck.findOne({
        where: {id: id},
    });

    if(!deck){
        return res.status(404).send({
            error: 'Not found!', 
        });
    }

    const deckCards: IDeckCard[] = await DeckCard.findAll({
        where: {deck_id: deck.id, drawn: false},
    });
    
    const cards: ICard[] = await Card.findAll({
        where: {id: deckCards.map((deckCard: IDeckCard) => deckCard.card_id)}
    })

    res.status(200).send({
        id: deck.id, 
        type: deck.type, 
        shuffled: deck.shuffled, 
        remaining: cards.length,
        cards: cards
    });
}

export const createDeck = async (req: Request, res: Response) => {
    const { type, shuffled }: { type: string, shuffled: boolean } = req.body
    
    if(type !== DECK_TYPE.FULL && type !== DECK_TYPE.SHORT || shuffled === undefined){
        return res.status(400).send({
            error: 'Invalid request!', 
        });
    }    
    
    const deck: IDeck = await Deck.create({type, shuffled, id: uuidv4()})
    let cards: ICard[] = await Card.findAll({})
    cards = type === DECK_TYPE.SHORT
     ? cards.filter((card: ICard) => !EXCLUDED_CARDS.includes(card.value)).slice(0, DECK_SHORT_AMOUNT) 
     : cards;
    
    cards = shuffled ? shuffle(cards) : cards;

    cards.forEach((card: ICard) => DeckCard.create({card_id: card.id, deck_id: deck.id}))
    
    res.status(201).send({
        id: deck.id, 
        type: deck.type, 
        shuffled: deck.shuffled, 
        remaining: cards.length,
    });
}

export const drawDeckCards = async (req: Request, res: Response) => {
    const count: number = req.body.count
    const id: string = req.params.id
    
    const deck: IDeck = await Deck.findOne({
        where: {id: id},  
    });

    if(!deck || !count){
        return res.status(404).send({
            error: 'Invalid request!', 
        });
    }

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