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


(async () => {
  await startDataBase();
})();
