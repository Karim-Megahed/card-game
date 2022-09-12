import express, { Express, Request, Response } from 'express'
import decksRoutes from "./routes/decks"

const app: Express = express()
const PORT = 8000

app.use(express.json())
app.use('/decks', decksRoutes)

app.listen(PORT, () =>{    
    console.log(`Server is running on ${PORT}`)
})