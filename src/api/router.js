import Router from 'express'
import Controller  from './Controller.js'


const router = new Router()

router.post('user/login', Controller.addUserToController) 
router.get('user/login',Controller.getUser) 
router.delete('user/login',Controller.deleteUserFromController) 
router.post('recipes/:id' , Controller.handleCurrentRecipes) 
router.get('recipes/:id' , Controller.handleCurrentRecipes) 


router.post('user/recipes/:id', Controller.addRecipeToController)
router.get('user/recipes/:id', Controller.getOneRecipe) 
router.delete('user/recipes/:id', Controller.deleteOneRecipe) 




router.get('user/recipes', Controller.getAllRecipes) 


export default router