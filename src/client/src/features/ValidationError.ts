export default class ValidationError {
  constructor(type, description) {
    this.type = type;
    this.description = description;
  }
  static defaultPasswordLength = 8;
  static validate(data) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validationErrors = [];
    if (!emailRegex.test(data.email)) validationErrors.push(new ValidationError(
      'email', 'Invalid email',
    ));
    if (data.password.length < ValidationError.defaultPasswordLength)
      validationErrors.push(new ValidationError(
      'password', 'Password is shorter than 8 symbols',
    ));
    if (!data.password || !data.password.length) validationErrors.push(new ValidationError(
      'password', 'Password is required',
    ));
    if (data.confirm && data.confirm !== data.password) validationErrors.push(new ValidationError(
      'confirm', 'Password does not match',
    ));
    return validationErrors;
  }

  toString() {
    return this.description;
  }
}