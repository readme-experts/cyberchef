'use strict';
const mysql = require('mysql');
const config = require('./config/config.json');

let con;
async function startDataBase() {
  con = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    database: config.db_database,
    password: config.db_password,
  });
  await con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
}

async function sqlRequest(sql, params = null) {
  return await new Promise((resolve, reject) => {
    con.query(sql, params, (err, rows) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(rows);
      }
    });
  });
}

(async () => {
  await startDataBase();
})();

async function addUserToDb(username, email, password) {
  const findUserRequest = `SELECT * FROM usersdata WHERE username = ?`;
  const checkUserExistence = await sqlRequest(findUserRequest, [username]);
  if (checkUserExistence[0])
    throw new Error('User with this username already exists');
  const findMailRequest = `SELECT * FROM usersdata WHERE email = ?`;
  const checkMailExistence = await sqlRequest(findMailRequest, [email]);
  if (checkMailExistence[0])
    throw new Error('User with this email already exists');

  const addUserRequest = `INSERT INTO usersdata
(id, username, email, password)
VALUES (NULL, ?, ?, ?);`;
  const res = await sqlRequest(addUserRequest, [username, email, password]);
  if (res.affectedRows === 1) return true;
  return false;
}

async function addRecipeToDb(
  name,
  categoryId,
  products,
  description,
  imageLink
) {
  const addRecipeRequest = `INSERT INTO recipes
    (id, name, category_id, products, description, image_link)
    VALUES (NULL, ?, ?, ?, ?, ?);`;
  const res = await sqlRequest(addRecipeRequest, [
    name,
    categoryId,
    products,
    description,
    imageLink,
  ]);
  if (res.affectedRows === 1) return true;
  return false;
}

async function addCategoryToDb(categoryName) {
  const addCategoryRequest = `INSERT INTO categories
    (id, name)
    VALUES (NULL, ?);`;
  const res = await sqlRequest(addCategoryRequest, [categoryName]);
  if (res.affectedRows === 1) return true;
  return false;
}

async function addUserFavRecipeToDb(userId, recipeId) {
  const addUserFavRecipeRequest = `INSERT INTO favourite_recipes
      (id, user_id, recipe_id)
      VALUES (NULL, ?, ?);`;
  const res = await sqlRequest(addUserFavRecipeRequest, [userId, recipeId]);
  if (res.affectedRows === 1) return true;
  return false;
}

async function getAllRecipes() {
  const getRecipesRequest = `SELECT * FROM recipes`;
  const res = await sqlRequest(getRecipesRequest);
  return res; //returns array of objects(recipes)
}

async function getUserData(username) {
  const getUserDataRequest = `SELECT * FROM usersdata WHERE username = ?`;
  const res = await sqlRequest(getUserDataRequest, [username]);
  if (res[0]) return res[0];
}

async function getUserFavRecipes(userId) {
  const recipesArr = [];
  const getUserFavRecipesRequest = `SELECT * FROM favourite_recipes 
  WHERE user_id = ?`;
  const res = await sqlRequest(getUserFavRecipesRequest, [userId]);
  if (res[0]) {
    for (const el of res) {
      recipesArr.push(el.recipe_id);
    }
    return recipesArr; //retuns array of recipes ids
  }
}

async function getRecipe(recipeId) {
  const getRecipeRequest = `SELECT * FROM recipes WHERE id = ?`;
  const res = await sqlRequest(getRecipeRequest, [recipeId]);
  if (res[0]) return res[0];
}

async function deleteRecipe(recipeId) {
  const deleteRecipeRequest = `DELETE FROM recipes WHERE id = ?`;
  const res = await sqlRequest(deleteRecipeRequest, [recipeId]);
  if (res.affectedRows === 1) return true;
  return false;
}

async function getAllUsers() {
  const getUsersRequest = `SELECT * FROM usersdata`;
  const res = await sqlRequest(getUsersRequest);
  return res; //returns array of objects(users)
}

async function deleteFavouriteRecipe(userId, recipeId) {
  const deleteFavRecipeRequest = `DELETE FROM favourite_recipes 
  WHERE user_id = ?
  AND recipe_id = ?`;
  const res = await sqlRequest(deleteFavRecipeRequest, [userId, recipeId]);
  if (res.affectedRows === 1) return true;
  return false;
}

async function getCategoryName(categoryId) {
  const categoryNameRequest = `SELECT name FROM categories WHERE id = ?`;
  const res = await sqlRequest(CategoryNameRequest, [categoryId]);
  if (res[0]) return res[0].name;
}

async function findRecipes(str) {
  const findRecipesRequest = `SELECT * FROM recipes WHERE name LIKE ?`;
  const res = await sqlRequest(findRecipesRequest, [`%${str}%`]);
  console.dir(res);
  if (res[0]) return res;
}

module.exports = {
  addUserToDb,
  addRecipeToDb,
  addCategoryToDb,
  addUserFavRecipeToDb,
  getAllRecipes,
  getUserData,
  getUserFavRecipes,
  getRecipe,
  deleteRecipe,
  getAllUsers,
  deleteFavouriteRecipe,
  getCategoryName,
  findRecipes,
};
