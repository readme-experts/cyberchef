import BaseService from './BaseService';
import RecipeError from './errors/RecipeError';
import { RecipeModel } from './models/RecipeModel';
import { RecipeDTO } from './DTO/RecipeDTO';

export default class RecipeService extends BaseService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async createRecipe(recipeData: RecipeDTO) {
    try {
      return await this.request(`/recipes`, 'POST', recipeData);
    } catch (error) {
      throw new RecipeError('Error creating recipe: ' + (error as Error).message);
    }
  }

  async getRecipe(recipeId: number): Promise<RecipeModel> {
    try {
      return await this.request(`/recipes/${recipeId}`, 'GET');
    } catch (error) {
      throw new RecipeError('Error getting recipe: ' + (error as Error).message);
    }
  }

  async getRecipesByName(query: string): Promise<RecipeModel[]> {
    try {
      return await this.request(`/recipes?${query}`, 'GET');
    } catch (error) {
      throw new RecipeError('Error getting recipes by name: ' + (error as Error).message);
    }
  }

  async updateRecipe(recipeId: number, recipeData: RecipeDTO) {
    try {
      return await this.request(`/recipes/${recipeId}`, 'PUT', recipeData);
    } catch (error) {
      throw new RecipeError('Error updating recipe: ' + (error as Error).message);
    }
  }

  async deleteRecipe(recipeId: number) {
    try {
      return await this.request(`/recipes/${recipeId}`, 'DELETE');
    } catch (error) {
      throw new RecipeError('Error deleting recipe: ' + (error as Error).message);
    }
  }


}
