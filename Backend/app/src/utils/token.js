const jwt = require("jsonwebtoken")

const generateToken = (id) => {
  return jwt.sign({ id }, global.config.JWT_SECRET, {
    expiresIn: global.config.TOKEN_EXPIRESIN,
  })
}

module.exports = generateToken
