'use strict';

const jwt = require('jsonwebtoken');

class TokenService {
  generateAccessToken(id)  {
    const payload = {
      id,
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '24h',
    });
  }

  getUserId(req)  {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return payload.id;
  }
}

module.exports = new TokenService();
