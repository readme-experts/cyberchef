export default class ValidationError {
  constructor(type, description) {
    this.type = type;
    this.description = description;
  }

  static Validate(data) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validationErrors = [];
    if (!emailRegex.test(data.email)) validationErrors.push(new ValidationError(
      'email', 'Invalid email',
    ));
    if (data.password.length < 8) validationErrors.push(new ValidationError(
      'password', 'Password is shorter that 8 symbols',
    ));
    if (data.confirm && data.confirm !== data.password) validationErrors.push(new ValidationError(
      'password', 'Password does not match',
    ));
    return validationErrors;
  }

  toString() {
    return this.description;
  }
}
