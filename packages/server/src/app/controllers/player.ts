import Player from '../models/Player';

class PLayerController {
  async find(playerId: string) {
    const player = await Player.findOne({
      attributes: ['name'],
      where: {
        playerId
      }
    })

    return player
  }
}

export default new PLayerController()