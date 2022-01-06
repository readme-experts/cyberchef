const db = require('../../database/db');
const jwt = require('jsonwebtoken');
const tokenService = require('../service/token-service');
const ParseService = require('../service/recipe-service');
// const fs = require('fs')


let jsonData = require('../array.json')
ParseService.addRecipesFromParcer(jsonData)


class Controller {
  async addRecipe(req, res) {
    try {
      const { name, category_id, products, description, image_link } = req.body;

      const newRecipe = {
        name,
        category_id,
        products,
        description,
        image_link,
      };
      await db.addRecipeToDb(
        newRecipe.name,
        newRecipe.category_id,
        newRecipe.products,
        newRecipe.description,
        newRecipe.image_link
      );
      return res.json({ message: 'Recipe added succefully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while adding recipe' });
    }
  }

  async getRecipeById(req, res) {
    try {
      const { id } = req.body;
      const neededRecipe = await db.getRecipe(id);
      return res.json(neededRecipe);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error by getting recipe by id' });
    }
  }

  catch(e) {
    console.log(e);
    res
      .status(400)
      .json({ message: 'Error ocured while getting recipes list' });
  }

  async addUserRecipe(req, res) {
    try {
      const { recipe_id } = req.body;
      const user_id = tokenService.getUserId(req);
      await db.addUserFavRecipeToDb(user_id, recipe_id);
      return res.json({ message: 'Recipe added succefully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while adding recipe' });
    }
  }

  async getUserRecipes(req, res) {
    try {
      const user_id = tokenService.getUserId(req);
      const userFavId = await db.getUserFavRecipes(user_id);
      let userFavList = [];
      for (let i = 0; i < userFavId.length; i++) {
        let irecipe = await db.getRecipe(userFavId[i]);
        userFavList.push(irecipe);
      }
      return res.json(userFavList);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while gettig recipe' });
    }
  }

  async deleteUserRecipe(req, res) {
    try {
      const user_id = tokenService.getUserId(req);
      const { recipe_id } = req.body;
      await db.deleteFavouriteRecipe(user_id, recipe_id);
      return res.status(200).json({ message: 'User recipe deleted' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while deleting recipe' });
    }
  }
}

module.exports = new Controller();
