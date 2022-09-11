import express from 'express'
import { getDecks, getDeck, createDeck } from '../controllers/decks'
const router = express.Router();

router.get('/', getDecks)

router.get('/:id', getDeck)

router.post('/', createDeck)


export default router