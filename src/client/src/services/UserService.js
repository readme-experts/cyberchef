import BaseService from './BaseService';
import UserError from './errors/UserError';

export default class UserService extends BaseService {
  constructor(baseURL) {
    super(baseURL);
  }

  async getUserRecipes() {
    try {
      return await this.request(`/user/authored`, 'GET');
    } catch (error) {
      throw new UserError('Error getting authored recipes: ' + error.message);
    }
  }

  async getFavoriteRecipes() {
    try {
      return await this.request(`/user`, 'GET');
    } catch (error) {
      throw new UserError('Error getting favorite recipes: ' + error.message);
    }
  }

  async addFavoriteRecipe(userId, recipeId) {
    try {
      return await this.request(`/user`, 'POST', { userId, recipeId });
    } catch (error) {
      throw new UserError('Error adding favorite recipe: ' + error.message);
    }
  }
  async deleteFavoriteRecipe(recipeId) {
    try {
      return await this.request(`/user`, 'DELETE', recipeId);
    } catch (error) {
      throw new UserError('Error deleting favorite recipe: ' + error.message);
    }
  }



}
