import BaseService from './BaseService';
import RecipeError from './errors/RecipeError';

export default class RecipeService extends BaseService {
  constructor(baseURL) {
    super(baseURL);
  }

  async createRecipe(recipeData) {
    try {
      return await this.request(`/recipes`, 'POST', recipeData);
    } catch (error) {
      throw new RecipeError('Error creating recipe: ' + error.message);
    }
  }

  async getRecipe(recipeId) {
    try {
      return await this.request(`/recipes/${recipeId}`, 'GET');
    } catch (error) {
      throw new RecipeError('Error getting recipe: ' + error.message);
    }
  }

  async getRecipesByName(query) {
    try {
      return await this.request(`/recipes?${query}`, 'GET');
    } catch (error) {
      throw new RecipeError('Error getting recipes by name: ' + error.message);
    }
  }

  async updateRecipe(recipeId, recipeData) {
    try {
      return await this.request(`/recipes/${recipeId}`, 'PUT', recipeData);
    } catch (error) {
      throw new RecipeError('Error updating recipe: ' + error.message);
    }
  }

  async deleteRecipe(recipeId) {
    try {
      return await this.request(`/recipes/${recipeId}`, 'DELETE');
    } catch (error) {
      throw new RecipeError('Error deleting recipe: ' + error.message);
    }
  }


}
