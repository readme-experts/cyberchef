const authRouter = require('express');
const authrouter = new authRouter();
const authcontroller = require('../controllers/authController');
const userService = require('../../api/service/user-service');

authrouter.post(
  '/registration',
  userService.validate,
  authcontroller.registration
);

authrouter.post('/login',
  userService.validate(),
  authcontroller.login);

module.exports = authrouter;
