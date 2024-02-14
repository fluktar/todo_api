// decyduj który potrzebujesz sql czy mongo
//tutaj jest sql
//   const mysql = require("mysql2/promise");
// 		const pool = mysql.createPool({
// 		  host: "localhost",
// 		  databasea: "blog",
// 		  user: "root",
// 		  password: "Sojokotojo1@3",
// 		});
// 		module.exports = pool;
// ---------------------------------------------------------------
//tutaj jest mongodb
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const password = require("./password");
const url = `mongodb+srv://fluktar:${password}@cluster0.xw4ekbx.mongodb.net/?retryWrites=true&w=majority`;
let database;
async function initDb() {
  const client = await MongoClient.connect(url);
  database = client.db("todo_app");
}

function getDb() {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}
module.exports = {
  initDb: initDb,
  getDb: getDb,
};
