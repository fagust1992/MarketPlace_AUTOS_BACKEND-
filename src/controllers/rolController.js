const { Pool } = require("pg"); // traigo el pool
const { credenciales } = require("../db/credentials");
const pool = new Pool(credenciales); // instancio el pool

const CreateRol = async (rol, roledescription) => {
  if ((rol != "") & (roledescription != "")) {
    try {
      const consulta = "INSERT INTO rol VALUES (DEFAULT,$1, $2)";
      const values = [rol, roledescription];
      const result = await pool.query(consulta, values);
      console.log(result);
    } catch (error) {
      throw new Error("ha fallado la consulta", { cause: error });
    }
  }
};
const obtenerRol = async () => {
  try {
    const { rows: roles } = await pool.query("SELECT * FROM rol");

    if (roles.length > 0) {
      return roles;
    }
  } catch (error) {
    console.error("Error al intentar traer rolres :", error);
    throw new Error("ha fallado la conexion con los datos", { cause: error });
  }
};

module.exports = { obtenerRol, CreateRol };
