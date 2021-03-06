'use strict';

const db = require('../../database/db');

const idRecipe = {
  'Бульоны и супы': 1,
  'Горячие блюда': 2,
  'Салаты': 3,
  'Закуски': 4,
  'Напитки': 5,
  'Соусы': 6,
  'Выпечка': 7,
  'Десерты': 8,
  'Заготовки': 9,
  'Блюда из лаваша': 10,
  'Готовим в аэрогриле': 11,
  'Каши': 12,
  'Украшения для блюд': 13,
  'Готовим в пароварке': 14,
  'Приготовление молочных продуктов': 15,
  'Готовим в мультиварке': 16,
  'Маринад, панировка': 17,
};

class ParseService {
  addRecipesFromParcer(jsonData)  {
    for (const el of jsonData) {
      const name = el.name;
      const categoryIdStr = el.categoryId;
      const categoryId = idRecipe[categoryIdStr];
      const products = el.products;
      const description = el.description;
      const imageLink = el.imageLink;
      db.addRecipeToDb(name, categoryId, products, description, imageLink);
    }
  }
}

module.exports = new ParseService();

