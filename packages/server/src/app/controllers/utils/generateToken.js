import jwt from 'jsonwebtoken';

export default function(playerId, app_secret) {
  return jwt.sign({ playerId }, app_secret)
}