
const authRouter = require('express');
const authrouter = new authRouter();
const authcontroller = require('../controllers/authController');

const { check } = require('express-validator');

authrouter.post(
  '/registration',
  [
    check('username', 'Username should not be empty').notEmpty(),
    check('password', 'Password should be longer than 6 symbols').isLength({
      min: 4,
      max: 14,
    }),
  ],
  authcontroller.registration
);
authrouter.post('/login', authcontroller.login);

module.exports = authrouter;
