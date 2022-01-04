const Router = require('express');
const router = new Router();
const controller = require('../controllers/Controller');
const authMiddleware = require('../authMiddleware');

// router.post('/recipes/:id' , controller.handleCurrentRecipes) //will be added asas parser done
// router.get('/recipes/:id' , controller.handleCurrentRecipes)

router.post('/user/recipes', authMiddleware, controller.addRecipe);
router.get('/user/recipes', authMiddleware, controller.getRecipeById);
router.delete('/user/recipes', authMiddleware, controller.deleteRecipeById);

router.get('/user/myrecipes', authMiddleware, controller.getAllRecipes);

module.exports = router;
