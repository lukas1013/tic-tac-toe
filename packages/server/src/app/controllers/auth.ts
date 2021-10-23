import { Request, Response } from 'express';
import { checkPassword, createInstance } from '../models/Player';
import { v4 as uuidv4 } from 'uuid';

import { app_secret } from '../../config';
import generateToken from './utils/generateToken';

class AuthController {
  async signUp(req: Request, res: Response) {
    const { email, name, password } = req.body;
    
    if (!email && !password) {
      //creates a guest
      const guest = await createInstance({ name: name ?? 'Guest' + uuidv4().slice(0,10) }, true)

      if (guest) {
        return res.json({
          guest,
          token: generateToken(guest.playerId, app_secret)
        })
      }

      return res.status(400).send()
    }
    
    //creates a new player
    const player = await createInstance({ email, name, password });

    if (player) {
      return res.json({
        player: {
          name: player.name,
          email: player.email,
          score: player.score,
          level: player.level
        },
        token: generateToken(player.playerId, app_secret)
      })
    }
    
    return res.status(400).send()
  }

  async signIn(req: Request, res: Response) {
    const { user, password } = req.body;

    const player = await createInstance({
      attributes: [
        'email', 'isGuest', 'level', 'score', 'name', 'playerId', 'password'
      ],
      where: { email: user, name: user },
      orOperator: true
    })

    if (!player) {
      return res.status(401).send({ message: 'Player not found' })
    }

    if (!(await checkPassword(password, player.password))) {
      return res.status(401).send({ message: 'Incorrect password' })
    }

    return res.json({
      player: {
        name: player.name,
        email: player.email,
        score: player.score,
        level: player.level
      },
      token: generateToken(player.playerId, app_secret)
    })
  }

  
}

export default new AuthController();