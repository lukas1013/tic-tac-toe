import { router } from "./routes"
import express from 'express'
import cors from 'cors';

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(router)

export default app;