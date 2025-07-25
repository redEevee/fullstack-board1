const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akak182718@",
  database: "board_db"
});
connection.connect();
module.exports = connection;
