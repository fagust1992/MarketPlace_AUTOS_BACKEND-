const { Pool } = require("pg");
const { credenciales } = require("../db/credentials");

const pool = new Pool(credenciales);

const modificarUsuario = async ({
  id,
  nombre,
  apellido,
  email,
  password,
  direccion,
  telefono,
  likes,
  ventas,
  rolId,
  productoId,
  ventasId,
  imagen,
}) => {
  try {
    const consulta =
      "UPDATE usuario SET nombre=$1, apellido=$2, email=$3, password=$4, direccion=$5, telefono=$6, likes=$7, ventas=$8, rol_id=$9, producto_id=$10, ventas_id=$11, imagen=$12 WHERE id=$13";

    const values = [
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono,
      likes,
      ventas,
      rolId,
      productoId,
      ventasId,
      imagen,
      id,
    ];

    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw { code: 404, message: "No se encontró ningún usuario con este id" };
    }

    return rowCount;
  } catch (error) {
    throw new Error(`Error en modificarUsuario: ${error.message}`);
  }
};

const eliminarUsuario = async (id) => {
  try {
    const consulta = "DELETE FROM usuario WHERE id = $1";
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw { code: 404, message: "No se encontró ningún usuario con este id" };
    }

    return rowCount;
  } catch (error) {
    throw new Error(`Error en eliminarUsuario: ${error.message}`);
  }
};

const obtenerUsuarios = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM usuario");

    if (rows.length === 0) {
      return null;
    }

    return rows;
  } catch (error) {
    throw new Error(`Error en obtenerUsuarios: ${error.message}`);
  }
};

module.exports = {
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
};
