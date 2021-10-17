import { Router } from "express";

import AuthMiddleware from './app/middlewares/auth';
import AuthController from "./app/controllers/auth";

const router = Router()

router.get('/', (request,response) => {
  response.json({ message: 'Hello World' })
})

router.post('/auth/signup', AuthController.signUp)

router.use(AuthMiddleware)

router.post('/game', (req,res) => {
  return res.status(200).send()
})

export { router }