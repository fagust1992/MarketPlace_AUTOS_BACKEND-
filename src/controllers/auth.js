const { Pool } = require("pg"); // traigo el pool
const { credenciales } = require("../db/credentials");
const pool = new Pool(credenciales);
const bcrypt = require("bcryptjs");

const agregarusuario = async (
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
  imagen
) => {
  try {
    const Encriptada = bcrypt.hashSync(password); // cambiar el campo de la tabla con mas caracteres para que no de error
    const consulta =
      "INSERT INTO usuario VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
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
    ];
    const result = await pool.query(consulta, values);

    return result;
  } catch (error) {
    throw new Error("ha fallado la consulta", { cause: error });
  }
};
const login = async (email, password) => {
  try {
    const values = [email, password];
    const consulta = "SELECT * FROM usuario WHERE email = $1 AND password= $2";

    const {
      rows: [Usuario],
      rowCount,
    } = await pool.query(consulta, values);
    const { password: passwordEncriptada } = Usuario;

    const passwordEsCorrecta = bcrypt.compareSync(password, Usuario.password); // debo encriptar primero
    console.log(typeof Usuario.password);
  } catch (error) {
    console.log(error.message);
  }
};
const modificarpassword = async (password, id) => {
  try {
    const consulta = "UPDATE usuario SET password  = $1 WHERE id = $2";
    const values = [password, id];
    const { rowCount } = await pool.query(consulta, values);
    if (rowCount === 0) {
      throw { code: 404, message: "No existe ningún usuario con este id" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getuser = async (email) => {
  try {
    const consulta = "SELECT * FROM usuario WHERE email = $1";
    const values = [email];
    const {
      rows: [usuario],
    } = await pool.query(consulta, values);
    const newObjet = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      password: usuario.password,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      likes: usuario.likes,
      ventas: usuario,
      rol_id: usuario.rol_id,
      producto_id: usuario.producto_id,
      ventas_id: usuario.ventas_id,
      imagen: usuario.imagen,
    };
    return newObjet;
  } catch (error) {
    throw { code: 404, message: "No existe ningún usuario con este email" };
  }
};
const getInformation_tables = async () => {
  try {
    const { rows: information } = await pool.query(`
      SELECT r.rol, r.roledescription, p.*, u.likes
      FROM rol r
      JOIN usuario u ON r.id = u.rol_id
      JOIN productos p ON u.producto_id = p.id;
    `);
    if (information.length < 0) {
      throw { code: 404, message: "No existe ningún resultado " };
    } else {
      return information;
    }
  } catch (error) {
    console.error(error);
    throw { code: 404, message: "No se ejecuto la consulta " };
  }
};

module.exports = {
  login,
  agregarusuario,
  modificarpassword,
  getuser,
  getInformation_tables,
};
