import jwt from 'jsonwebtoken';

export default function(id, app_secret) {
  return jwt.sign({ id }, app_secret)
}