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

const obtenerRoles = async () => {
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

const modificarRol = async (rol, roledescription, id) => {
  try {
    const consulta =
      "UPDATE rol SET rol = $1, roledescription = $2  WHERE id = $3";

    const values = [rol, roledescription, id];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw { code: 404, message: "No existe ningún rol con este id" };
    }
  } catch (error) {
    throw new Error("ha fallado la consulta del rol", { cause: error });
  }
};

const eliminarRol = async (id) => {
  try {
    const consulta = "DELETE FROM rol WHERE id = $1";
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
    }
  } catch (error) {
    console.log(`Error deleting rol: ${error.message}`);
  }
};

module.exports = { obtenerRoles, CreateRol, modificarRol, eliminarRol };
