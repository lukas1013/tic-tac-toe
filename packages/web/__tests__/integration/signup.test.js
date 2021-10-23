/**
 * @jest-environment jsdom
 */

import axios from '../../src/services/api';

import truncate from '../utils/truncate';

const getPlayer = () => ({
  name: 'John',
  email: 'john@gmail.com',
  password: '12345678'
})

describe('SignUp', () => {
  beforeEach(() => {
    truncate()
  }, 5000)

  it('should create player with valid credentials', async () => {
    const response = await axios.post('/auth/signup', {
      ...getPlayer()
    })

    expect(response.data).toHaveProperty('token')
  })

  it('should not create player with invalid email', async () => {
    const player = getPlayer()
    player.email = '228d..ja@.c'

    const status = await axios.post('/auth/signup', {
      ...player
    }).then(res => res.status).catch(e => {
      return e.response.status
    })

    expect(status).toBe(400)
  })

  it('should not create player without required params', async () => {
    
  })
})