import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import Deck from '../models/deck';
import { IDeck, DECK_TYPE } from '../interfaces/deck'
import { ICard } from '../interfaces/card'
import { createCards, getDeckCards, isValidDeckData, setCardDrawnState } from '../services/deck';

export const openDeck = async (req: Request, res: Response) => {
    const id: string = req.params.id

    const deck: IDeck = await Deck.findOne({where: {id: id}})

    if(!deck){
        return res.status(404).send({
            error: 'Not found!', 
        });
    }

    const cards: ICard[] = await getDeckCards(deck)

    res.status(200).send({
        id: deck.id, 
        type: deck.type, 
        shuffled: deck.shuffled, 
        remaining: cards.length,
        cards: cards
    });
}

export const createDeck = async (req: Request, res: Response) => {
    const { type, shuffled }: { type: DECK_TYPE, shuffled: boolean } = req.body
    
    if(isValidDeckData(type, shuffled)){
        res.status(400).send({
            error: 'Invalid request!', 
        });
        return
    }    
    
    const deck: IDeck = await Deck.create({type, shuffled, id: uuidv4()})
    const cards = await createCards(deck)

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

    const deck: IDeck = await Deck.findOne({where: {id: id}})

    if(!deck || !count || count < 1){
        return res.status(404).send({
            error: 'Invalid request!', 
        });
    }

    setCardDrawnState(deck, count)

    res.status(200).send(await getDeckCards(deck))
}