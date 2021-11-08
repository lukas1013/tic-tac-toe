import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import playerController from './app/controllers/player';
import * as game from './game';

export default (app: Express.Application) => {
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  io.engine.generateId = req => {
    return uuidv4()
  }

  io.on('connection', socket => {
    console.log(socket.id);

    // Authorization: "Bearer ${token}".split(' ')[1] // ${token}
    socket.on('online', async () => {

      const token = socket.handshake.headers.authorization?.split(' ')[1]
      if (token) {
        const { id: playerId } = jwt.decode(token) as { id: string }
        const _player = await playerController.find(playerId)

        console.log(`${_player.name} has been connected`)

        socket.on('play', () => {
          const { room: gameRoom, roomId } = game.init({ name: _player.name, playerId: socket.id })
          socket.join(roomId)

          io.to(roomId).emit('game setup', gameRoom)

          if (gameRoom.p2) {
            io.to(roomId).emit('start')
          }

          socket.on('add symbol', ({ row, col }: { row: string, col: string }) => {
            console.log({ row, col });
            
            game.addSymbol(roomId, { col, row }, roomId === socket.id ? 'p1' : 'p2')
            io.to(roomId).emit('add symbol', { col, row, player: _player.name })
          })
        })
      }
    })
  })

  return server
}