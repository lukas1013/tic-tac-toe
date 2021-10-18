import { Router } from "express";

import AuthMiddleware from './app/middlewares/auth';
import ValidationMiddleware from './app/middlewares/validation';

import AuthController from "./app/controllers/auth";

const router = Router()

//validates email and password

router.get('/', (request,response) => {
  response.json({ message: 'Hello World' })
})

router.post('/auth/signup/:name/:email/:password', ValidationMiddleware, AuthController.signUp)
router.post('/auth/signup/:name/:email/', ValidationMiddleware, AuthController.signUp)
router.post('/auth/signin', AuthController.signIn)

router.use(AuthMiddleware)

router.post('/game', (req,res) => {
  return res.status(200).send()
})

export { router }