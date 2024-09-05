const mysql = require("mysql");
const util = require('util')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});
// Convertir la función query a una que devuelva promesas
db.query = util.promisify(db.query);
db.connect((err) => {
  if (err) {
    console.log("Error al conectarse a la base de datos", err);
    process.exit(1);
  }
  console.log("Conectado a la base de datos");
});
module.exports = db;
