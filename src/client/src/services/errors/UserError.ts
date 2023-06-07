import BaseError from './BaseError';

export default class UserError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
