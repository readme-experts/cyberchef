import BaseError from './BaseError';

export default class RecipeError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
