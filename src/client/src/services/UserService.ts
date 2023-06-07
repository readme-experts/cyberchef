import BaseService from './BaseService';
import UserError from './errors/UserError';
import { RecipeModel } from './models/RecipeModel';

export default class UserService extends BaseService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async getUserRecipes(): Promise<RecipeModel[]> {
    try {
      return await this.request(`/user/authored`, 'GET');
    } catch (error) {
      throw new UserError('Error getting authored recipes: ' + (error as Error).message);
    }
  }

  async getFavoriteRecipes(): Promise<RecipeModel[]>  {
    try {
      return await this.request(`/user`, 'GET');
    } catch (error) {
      throw new UserError('Error getting favorite recipes: ' + (error as Error).message);
    }
  }

  async addFavoriteRecipe(userId: number, recipeId: number) {
    try {
      return await this.request(`/user`, 'POST', { userId, recipeId });
    } catch (error) {
      throw new UserError('Error adding favorite recipe: ' + (error as Error).message);
    }
  }
  async deleteFavoriteRecipe(recipeId: number) {
    try {
      return await this.request(`/user`, 'DELETE', recipeId);
    } catch (error) {
      throw new UserError('Error deleting favorite recipe: ' + (error as Error).message);
    }
  }



}
