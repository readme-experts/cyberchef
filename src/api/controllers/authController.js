'use strict';

const db = require('../../database/db');
const { validationResult } = require('express-validator');
const tokenService = require('../service/token-service');

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Registration mistake', errors });
      }
      const { username, password } = req.body;

      await db.addUserToDb(username, username, password);

      return res.json({ message: 'user added succcesfully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Registration mistake', errors });
      }

      const { username, password } = req.body;
      const user = await db.getUserData(username);

      if (!user) {
        return res
          .status(400)
          .json({ message: `user ${username} was not found` });
      }

      const comparepass = (str1, str2) => str1 === str2;
      const result = comparepass(password, user.password);
      if (!result) {
        return res.status(400).json({ message: `pass is not correct` });
      }
      const token = tokenService.generateAccessToken(user.id);
      return res.json({ token, user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
}

module.exports = new AuthController();
