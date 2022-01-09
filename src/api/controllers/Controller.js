'use strict';

const db = require('../../database/db');
const tokenService = require('../service/token-service');

const parser = require('../service/parser-service');
const jsonData = require('../../parser/data/recipes.json');
parser.addRecipesFromParcer(jsonData);

class Controller {
  async addRecipe(req, res) {
    try {
      const { name, categoryId, products, description, imageLink } = req.body;

      await db.addRecipeToDb(
        name,
        categoryId,
        products,
        description,
        imageLink
      );
      return res.json({ message: 'Recipe added succefully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while adding recipe' });
    }
  }

  async getRecipeById(req, res) {
    try {
      const { recipeId } = req.body;
      const neededRecipe = await db.getRecipe(recipeId);
      return res.json(neededRecipe);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error by getting recipe by id' });
    }
  }

  async getRecipeByName(req, res) {
    try {
      const { recipeName } = req.body;
      const recipe = await db.findRecipes(recipeName);
      return res.json(recipe);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error by getting recipe by name' });
    }
  }

  async addUserRecipe(req, res) {
    try {
      const { recipeId } = req.body;
      const userId = tokenService.getUserId(req);
      await db.addUserFavRecipeToDb(userId, recipeId);
      return res.json({ message: 'Recipe added succefully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while adding recipe' });
    }
  }

  async getUserRecipes(req, res) {
    try {
      const userId = tokenService.getUserId(req);
      const userFavId = await db.getUserFavRecipes(userId);
      const userFavList = [];
      for (const el of userFavId) {
        const recipeById = await db.getRecipe(el);
        userFavList.push(recipeById);
      }

      return res.json(userFavList);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: 'Error occured while gettig user recipes' });
    }
  }

  async deleteUserRecipe(req, res) {
    try {
      const userId = tokenService.getUserId(req);
      const { recipeId } = req.body;
      await db.deleteFavouriteRecipe(userId, recipeId);
      return res.status(200).json({ message: 'User recipe deleted' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while deleting recipe' });
    }
  }
}

module.exports = new Controller();
