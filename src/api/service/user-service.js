const { check } = require('express-validator');

class UserService {
  validate() {
    const validation = [
      check('username', 'Username should not be empty').notEmpty(),
      check('password', 'Password should be longer than 6 symbols').isLength({
        min: 4,
        max: 14,
      }),
    ];
    return validation;
  }
}

module.exports = new UserService();
