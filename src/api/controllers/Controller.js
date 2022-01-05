const db = require('../../database/db');
const jwt = require('jsonwebtoken');
const tokenService = require('../service/token-service');

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
      return res.json({ message: 'Recipe added succefully'});
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while adding recipe' });
    }
  }

  async getRecipeById(req, res) {
    try {
      const { id } = req.body;
      const neededRecipe = await db.getRecipe(id);
      return res.json({ neededRecipe });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error by getting recipe by id' });
    }
  }
  async getAllRecipes(req, res) {
    const allRecipes = await db.getAllRecipes();
    return res.json({ recipes: allRecipes });
  }
  catch(e) {
    console.log(e);
    res
      .status(400)
      .json({ message: 'Error ocured while getting recipes list' });
  }

//   async deleteRecipeById(req, res) {
//     try {
//       const { id } = req.body;
//       await db.deleteRecipe(id);
//       return res.json({ message: 'recipe successfully deleted' });
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: 'error by deleting receipe' });
//     }
//   }

  async addUserRecipe(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        // req.user = decodedData;
    //   const {user_id}  = jwt.verify(req.headers.authorization.split(' ')[1]);
      const recipe_id = req.body
      const user_id = payload.id
      await db.addUserFavRecipeToDb(user_id,recipe_id.id);
      return res.json({ message: 'Recipe added succefully' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while adding recipe' });
    }
  }

  async getUserRecipes(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        
      const user_id = payload.id
    //   return res.json(user_id)
    //   const user_id = tokenService()
      const userFavId = await db.getUserFavRecipes(user_id)
      for(let i = 0;i<userFavId.length;i++)  {
        const userFavList = await db.getRecipe(userFavId[i])
        // console.log(userFavList);
        return res.json(userFavList);
      } 
      
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error occured while gettig recipe' });
    }
  }


}


module.exports = new Controller();
