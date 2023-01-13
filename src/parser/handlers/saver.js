'use strict';

const fs = require('fs');

async function saveData(data) {
  try {
    const json = JSON.stringify(data);
    fs.writeFile('./data/recipes.json', json, err => {
      if (err) throw err;
      console.log('The file has been saved.');
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  saveData,
};
