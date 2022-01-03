const Router = require('express')
const router = new Router()
const controller = require('./Controller')


// router.post('recipes/:id' , Controller.handleCurrentRecipes) 
// router.get('recipes/:id' , Controller.handleCurrentRecipes) 


router.post('/user/recipes', controller.addRecipe)
 

router.get('/user/myrecipes', controller.getAllRecipes) 

// router.get('user/recipes', Controller.getOneRecipe) 
// router.delete('user/recipes', controller.deleteOneRecipe)
module.exports = router