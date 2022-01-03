const Router = require('express')
const router = new Router()
const controller = require('./Controller')


// router.post('/recipes/:id' , controller.handleCurrentRecipes) 
// router.get('/recipes/:id' , controller.handleCurrentRecipes) 


router.post('/user/recipes', controller.addRecipe)
router.get('/user/recipes', controller.getRecipeById)
router.delete('/user/recipes', controller.deleteRecipeById)

router.get('/user/myrecipes', controller.getAllRecipes) 


module.exports = router