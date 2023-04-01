const { Pool } = require("pg"); // traigo el pool
const { credenciales } = require("../db/credentials");
const pool = new Pool(credenciales); // instancio el pool

const obtenerRol = async () => {
  try {
    const { rows: roles } = await pool.query("SELECT * FROM rol");
    if (roles.length > 0) {
      return roles;
    }
  } catch (error) {
    throw new Error("ha fallado la conexion con los datos", { cause: error });
  }
};

module.exports = { obtenerRol };
