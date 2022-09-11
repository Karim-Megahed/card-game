import express, { Express, Request, Response } from 'express'
import decksRoutes from "./routes/decks"
import cardsRoutes from "./routes/cards"

const app: Express = express()
const PORT = 8000

app.use(express.json())
app.use('/decks', decksRoutes)
app.use('/cards', cardsRoutes)
