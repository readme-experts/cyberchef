const db = require('../../database/db');

class ParseService {
    addRecipesFromParcer = (jsonData) => {
        for(let i = 0;i<jsonData.length;i++){
            let name = jsonData[i].name
            let category_id = jsonData[i].category_id
            let products = jsonData[i].products
            let description = jsonData[i].description
            let image_link = jsonData[i].image_link
            console.log(`name${i+1} = ${name}`);
            db.addRecipeToDb(name,category_id,products,description,image_link)
        }
    }
}

module.exports = new ParseService();
