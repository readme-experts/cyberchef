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
  await con.connect(err => {
    if (err) throw err;
    console.log('Connected!');
  });
}

async function sqlRequest(sql, params = null) {
  return new Promise((resolve, reject) => {
    con.query(sql, params, (err, rows) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(rows);
      }
    });
  }).then();
}

(async () => {
  await startDataBase();

})();

async function addUserToDb(username, email, password) {
  const findUserRequest = `SELECT * FROM usersdata WHERE username = ?`;
  const checkUserExistence = await sqlRequest(findUserRequest, [username]);
  if (checkUserExistence[0]) return 'User with this username already exists';
  const findMailRequest = `SELECT * FROM usersdata WHERE email = ?`;
  const checkMailExistence = await sqlRequest(findMailRequest, [email]);
  if (checkMailExistence[0]) return 'User with this email already exists';

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

module.exports = {
  addUserToDb,
  addRecipeToDb,
  addCategoryToDb,
  addUserFavRecipeToDb,
};
