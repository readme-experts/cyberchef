const Router = require('express');
const router = new Router();
const controller = require('../controllers/Controller');
const authMiddleware = require('../authMiddleware');

router.post('/recipes',  controller.addRecipe);
router.get('/recipes',  controller.getRecipeById);


router.post('/user/recipes', authMiddleware, controller.addUserRecipe);
router.get('/user/recipes', authMiddleware, controller.getRecipeById);
router.delete('/user/recipes', authMiddleware, controller.deleteUserRecipe);
router.get('/user/myrecipes', authMiddleware, controller.getUserRecipes);


module.exports = router;
