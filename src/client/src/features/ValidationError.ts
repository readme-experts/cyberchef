export enum ValidationErrors {
  Email = 'email',
  Password = 'password',
  Confirm = 'confirm',
}

export enum ValidationDescriptions {
  Email = 'Invalid email',
  PasswordShort = 'Password is shorter than 8 symbols',
  PasswordEmpty = 'Password is required',
  Confirm = 'Password does not match',
}

export default class ValidationError {
  type: string;
  description: string;
  constructor(type: ValidationErrors, description: ValidationDescriptions) {
    this.type = type;
    this.description = description;
  }
  static defaultPasswordLength = 8;
  static validate(data: { email: string; password: string; confirm?: string; }) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validationErrors = [];
    if (!emailRegex.test(data.email)) validationErrors.push(new ValidationError(
      ValidationErrors.Email, ValidationDescriptions.Email,
    ));
    if (data.password.length < ValidationError.defaultPasswordLength)
      validationErrors.push(new ValidationError(
        ValidationErrors.Password, ValidationDescriptions.PasswordShort,
      ));
    if (!data.password || !data.password.length) validationErrors.push(new ValidationError(
      ValidationErrors.Password, ValidationDescriptions.PasswordEmpty,
    ));
    if (data.confirm && data.confirm !== data.password) validationErrors.push(new ValidationError(
      ValidationErrors.Confirm, ValidationDescriptions.Confirm,
    ));
    return validationErrors;
  }
}
