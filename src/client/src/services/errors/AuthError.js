import BaseError from './BaseError';

export default class AuthError extends BaseError {
  constructor(message) {
    super(message);
  }
}
