import request from 'supertest';
import { v1 as uuidv1 } from 'uuid';

import app from '../../src/app';
import Player from '../../src/app/models/Player';
import { app_secret } from '../../src/config';
import generateToken from '../utils/generateToken';
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(() => {
    truncate();
  }, 5000)

  it('should authenticate with valid credentials', async () => {
    const player = await Player.create({
      playerId: uuidv1(),
      name: 'Player1',
      email: 'p1@gmail.com',
      password: '12345'
    })

    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: player.email,
        password: '12345'
      });

    expect(response.status).toBe(200)
  });

  it('should not authenticate with invalid credentials', async () => {
    const player = await Player.create({
      playerId: uuidv1(),
      name: 'Player2',
      email: 'p2@gmail.com',
      password: '12345'
    })

    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: player.email,
        password: '48130'
      });

    expect(response.status).toBe(401)
  })

  it('should return JWT token when authenticated', async () => {
    const player = await Player.create({
      playerId: uuidv1(),
      name: 'Player3',
      email: 'p3@gmail.com',
      password: '12345'
    })

    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: player.email,
        password: '12345'
      });

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const player = await Player.create({
      playerId: uuidv1(),
      name: 'Player4',
      email: 'p4@gmail.com',
      password: '12345'
    })

    const response = await request(app)
      .post('/game')
      .set('Authorization', `Bearer ${generateToken(player.playerId, app_secret)}`);

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without JWT token', async () => {
    const response = await request(app)
      .post('/game')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid JWT token', async () => {
    const response = await request(app)
      .post('/game')
      .set('Authorization', `Bearer invalidToken`);

    expect(response.status).toBe(401)
  })
});