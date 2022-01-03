const db = require('../database/db')

class Controller  {
    async addRecipe(req,res) {
        try {
            const {name,
                categoryId,
                products,
                description,
                imageLink} = req.body

            const newRecipe = {name,categoryId,products,description,imageLink}
            await db.addRecipeToDb(newRecipe.name,newRecipe.categoryId,newRecipe.products,
                newRecipe.description, newRecipe.imageLink)
            return res.json({message: "Recipe added succefully"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error occured while adding recipe'});
        }
    }

    async getRecipeById(req,res) {
        try {
            const {id} = req.body
            const neededRecipe = await db.getRecipe(id)
            return res.json({message: neededRecipe})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'error by getting recipe by id'});
        }
    }
    async getAllRecipes(req,res) {
        const allRecipes = await db.getAllRecipes()
        return res.json({recipes: allRecipes})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error ocured while getting recipes list'});
        }
    
    async deleteRecipeById(req,res) {
        try {
            const {id} = req.body
            await db.deleteRecipe(id)
            return res.json({message: "recipe successfully deleted"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'error by deleting receipe'});
        }
    }
    

}

module.exports = new Controller()