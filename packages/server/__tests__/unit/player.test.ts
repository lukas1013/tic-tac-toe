import * as Player from '../../src/app/models/Player';
import bcrypt from 'bcryptjs';
import { v1 as uuidv1 } from 'uuid';

const truncate = require('../utils/truncate');

describe('Player', () => {
  beforeEach(() => {
    truncate()
  })

  it('should encrypt player password', async () => {
    const player = await Player.createInstance({
      name: 'Lucas',
      playerId: uuidv1(),
      email: 'lucas@gmail.com',
      password: '12345'
    })
    
    expect(await bcrypt.compare('12345', player.passwordHash)).toBe(true)
  })
})