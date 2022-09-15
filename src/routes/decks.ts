import express from 'express'
import { openDeck, createDeck, drawDeckCards } from '../controllers/decks'

const router = express.Router()

router.get('/:id', openDeck)

router.post('/:id', drawDeckCards)

router.post('/', createDeck)

export default router