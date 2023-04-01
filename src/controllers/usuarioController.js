const { Pool } = require("pg"); // traigo el pool
const { credenciales } = require("../db/credentials");
const pool = new Pool(credenciales);
const bcrypt = require("bcryptjs");

const modificarUsuario = async (
  nombre,
  apellido,
  email,
  password,
  direccion,
  telefono,
  Likes,
  ventas,
  rol_id,
  producto_id,
  ventas_id,
  imagen,
  id
) => {
  try {
    const consulta =
      "UPDATE usuario SET  nombre = $1, apellido = $2, email = $3, password = $4, direccion = $5, telefono = $6, likes = $7, ventas = $8, rol_id = $9, producto_id = $10, ventas_id = $11, imagen = $12  WHERE id = $13";

    const values = [
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono,
      Likes,
      ventas,
      rol_id,
      producto_id,
      ventas_id,
      imagen,
      id,
    ];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw { code: 404, message: "No existe ningún usuario con este id" };
    }
  } catch (error) {
    response.send("ha fallado la consulta");
    throw new Error("ha fallado la consulta", { cause: error });
  }
};

const eliminarUsuario = async (id) => {
  try {
    const consulta = "DELETE FROM usuario WHERE id = $1";
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
    }
  } catch (error) {
    console.log(`Error deleting user: ${error.message}`);
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select user_id, username, email from users"
    );

    const encryptedRows = rows.map((row) => ({
      user_id: row.user_id,
      username: encrypt(row.username),
      email: encrypt(row.email),
    }));

    return res.status(200).json({
      success: true,
      users: encryptedRows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const obtenerUsuarios = async () => {
  try {
    const { rows: usuario } = await pool.query("SELECT * FROM usuario");
    if (usuario.length > 0) {
      return usuario;
    }
  } catch (error) {
    throw new Error("ha fallado la conexion con la tabla usuario", {
      cause: error,
    });
  }
};
module.exports = {
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
};
