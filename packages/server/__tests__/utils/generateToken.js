const jwt = require('jsonwebtoken');

module.exports = (playerId, app_secret) => {
  return jwt.sign({ playerId }, app_secret)
}