
const bcrypt = require("bcrypt");
const pool = require("../db");
require("dotenv").config();

async function createEmployee() {
  try {
    const username = process.argv[2];
    const nombre = process.argv[3];
    const password = process.argv[4];

    if (!username || !nombre || !password) {
      console.log("Uso:");
      console.log('node scripts/createEmployee.js "usuario" "Nombre Apellido" "password"');
      process.exit(1);
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO empleados (username, nombre, password_hash, activo)
      VALUES ($1, $2, $3, true)
      RETURNING id, username, nombre, activo
    `;

    const values = [username, nombre, password_hash];

    const result = await pool.query(query, values);

    console.log("Empleado creado correctamente:");
    console.log(result.rows[0]);

    process.exit(0);
  } catch (error) {
    console.error("Error creando empleado:", error.message);
    process.exit(1);
  }
}

createEmployee();