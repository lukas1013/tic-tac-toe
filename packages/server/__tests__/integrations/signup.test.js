import request from 'supertest';

import app from '../../src/app';
const truncate = require('../utils/truncate');

describe('SignIn', () => {
  beforeEach(() => {
    truncate()
  }, 5000)

  it('should create player with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/signup/John/Titor@gmail.com/20362036')

    expect(response.body).toHaveProperty('token')
  })

  it('should not create player with invalid email', async () => {
    const response = await request(app)
      .post('/auth/signup/Mcfly/ka1@&.com/20001918')

    expect(response.status).toBe(400)
  })

  it('should not create player without required params', async () => {
    const response = await request(app)
      .post('/auth/signup/Connor/con@gmail.com')

    expect(response.status).toBe(400)
  })
})