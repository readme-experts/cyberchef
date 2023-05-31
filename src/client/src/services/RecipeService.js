import BaseService from './BaseService';

export default class RecipeService extends BaseService {
  constructor(baseURL) {
    super(baseURL);
  }

  async createRecipe(accountId, recipeData) {
    try {
      return await this.request(`/user/${accountId}/recipes`, 'POST', recipeData);
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  async getRecipe(accountId, recipeId) {
    try {
      return await this.request(`/user/${accountId}/recipes/${recipeId}`, 'GET');
    } catch (error) {
      console.error('Error getting recipe:', error);
      throw error;
    }
  }

  async updateRecipe(accountId, recipeId, recipeData) {
    try {
      return await this.request(`/user/${accountId}/recipes/${recipeId}`, 'PUT', recipeData);
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  }

  async deleteRecipe(accountId, recipeId) {
    try {
      return await this.request(`/api/user/${accountId}/recipes/${recipeId}`, 'DELETE');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }
}
