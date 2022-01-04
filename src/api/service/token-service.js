const jwt = require('jsonwebtoken');

class TokenService {
  generateAccessToken = (id) => {
    const payload = {
      id,
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '24h',
    });
  };
}

module.exports = new TokenService();
