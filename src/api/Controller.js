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

    // async getRecipe(req,res) {
    //     try {
    //         const recipeId = db.getRecipe()
    //         const newRecipe = {name,categoryId,products,description,imageLink}
    //         await db.addRecipeToDb(newRecipe.name,newRecipe.categoryId,newRecipe.products,
    //             newRecipe.description, newRecipe.imageLink)
    //     } catch (e) {
    //         console.log(e)
    //         res.status(400).json({message: 'Registration error'});
    //     }
    // }
    async getAllRecipes(req,res) {
        const allRecipes = await db.getAllRecipes()
        return res.json({recipes: allRecipes})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error ocured while getting recipes list'});
        }
    
        async deleteRecipe(req,res) {
            
            } catch (e) {
                console.log(e)
                res.status(400).json({message: 'Registration error'});
            }
    

}

module.exports = new Controller()