import request from 'supertest';

import app from '../../src/app';
const truncate = require('../utils/truncate');

describe('SignUp', () => {
  beforeEach(done => {
    truncate()

    done()
  })

  it('should create player with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        name: 'John',
        email: 'Titor@gmail.com',
        password: '20362036'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should not create player with invalid email', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Mcfly',
        email: 'ka1@&.com',
        password: '20001918'
      })

    expect(response.status).toBe(400)
  })

  it('should not create player without required params', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Connor',
        email: 'con@gmail.com'
      })

    expect(response.status).toBe(400)
  })
})