'use strict';
const mysql = require('mysql');
const config = require('./config.json');

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
        console.dir(err);
        reject(new Error('Error!!!'));
      } else {
        resolve(rows);
      }
    });
  }).then();
}

(async () => {
  await startDataBase();
  console.dir(await sqlRequest('Select * from usersdata'));
})();
