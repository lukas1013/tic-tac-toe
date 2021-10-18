import { Request, Response } from 'express';
import Player, { checkPassword, createInstance } from '../models/Player';
import { v4 as uuidv4 } from 'uuid';

import { app_secret } from '../../config';
import generateToken from './utils/generateToken';

class AuthController {
  async signUp(req: Request, res: Response) {
    const { email, name, password } = req.params;
    
    if (!email && !password) {
      //creates a guest
      const guest = await createInstance(true, {
        isGuest: true,
        name: name ?? 'Guest' + uuidv4().slice(0,10)
      })

      if (guest) {
        return res.json({
          guest,
          token: generateToken(guest.playerId, app_secret)
        })
      }

      return res.status(400).send()
    }
    
    //creates a new player
    const player = await createInstance({ email, name, password }, false);

    if (player) {
      return res.json({
        player,
        token: generateToken(player.playerId, app_secret)
      })
    }
    
    return res.status(400).send()
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const player = await Player.findOne({
      attributes: ['password'],
      where: { email }
    })

    if (!player) {
      return res.status(401).send({ message: 'Player not found' })
    }

    if (!(await checkPassword(password, player.getDataValue('password')))) {
      console.log(password, player.getDataValue('password'))
      return res.status(401).send({ message: 'Incorrect password' })
    }

    return res.json({
      player,
      token: generateToken(player.playerId, app_secret)
    })
  }

  
}

export default new AuthController();