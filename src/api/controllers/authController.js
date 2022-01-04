'use strict'

const db = require('../../database/db');
const { validationResult } = require('express-validator');
const tokenService = require('../service/token-service');



class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Registration mistake', errors });
      }
      const { username, email, password } = req.body;

      await db.addUserToDb(username, email, password);

      return res.json({ message: 'user added succcesfully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await db.getUserData(username);

      if (!user) {
        return res
          .status(400)
          .json({ message: `user ${username} was not found` });
      }

      let compare = (str1, str2) => str1 === str2;
      let result = compare(password, user.password);
      if (!result) {
        return res.status(400).json({ message: `pass is not correct` });
      }
      const token = tokenService.generateAccessToken(user.id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
}

module.exports = new authController();
