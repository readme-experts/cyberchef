import BaseService from './BaseService';
import RecipeError from './errors/RecipeError';

export default class RecipeService extends BaseService {
  constructor(baseURL) {
    super(baseURL);
  }

  async createRecipe(accountId, recipeData) {
    try {
      return await this.request(`/user/${accountId}/recipes`, 'POST', recipeData);
    } catch (error) {
      throw new RecipeError('Error creating recipe: ' + error.message);
    }
  }

  async getRecipe(accountId, recipeId) {
    try {
      return await this.request(`/user/${accountId}/recipes/${recipeId}`, 'GET');
    } catch (error) {
      throw new RecipeError('Error getting recipe: ' + error.message);
    }
  }

  async updateRecipe(accountId, recipeId, recipeData) {
    try {
      return await this.request(`/user/${accountId}/recipes/${recipeId}`, 'PUT', recipeData);
    } catch (error) {
      throw new RecipeError('Error updating recipe: ' + error.message);
    }
  }

  async deleteRecipe(accountId, recipeId) {
    try {
      return await this.request(`/api/user/${accountId}/recipes/${recipeId}`, 'DELETE');
    } catch (error) {
      throw new RecipeError('Error deleting recipe: ' + error.message);
    }
  }
}
