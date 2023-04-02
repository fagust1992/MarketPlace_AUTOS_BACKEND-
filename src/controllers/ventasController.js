const { Pool } = require("pg"); // traigo el pool
const { credenciales } = require("../db/credentials");
const pool = new Pool(credenciales); // instancio el pool
/**
 * Crea una nueva venta en la tabla "ventas" con los valores proporcionados.
 * @param {number} usuario_id - El ID del usuario que hizo la venta.
 * @param {string} productos - La lista de productos vendidos separados por comas.
 * @param {string} descripcion - Una breve descripción de la venta.
 * @param {number} detalle_ventas_id - El ID del detalle de venta asociado con la venta.
 * @param {Date} fecha - La fecha de la venta.
 */
const obtenerventas = async () => {
  try {
    const { rows: usuario } = await pool.query("SELECT * FROM ventas");
    return usuario;
  } catch (error) {
    throw new Error("ha fallado la conexion con la tabla usuario", {
      cause: error,
    });
  }
};

const Createventas = async (
  usuario_id,
  productos,
  descripcion,
  detalle_ventas_id,
  fecha
) => {
  try {
    const consulta = "INSERT INTO ventas VALUES (DEFAULT,$1,$2,$3,$4,$5)";
    const values = [
      usuario_id,
      productos,
      descripcion,
      detalle_ventas_id,
      fecha,
    ];
    const result = await pool.query(consulta, values);
    console.log(result);
  } catch (error) {
    throw new Error("ha fallado la consulta", { cause: error });
  }
};

const modificarventas = async (
  usuario_id,
  productos,
  descripcion,
  detalle_ventas_id,
  fecha,
  id
) => {
  try {
    const consulta =
      "UPDATE ventas SET usuario_id = $1, productos = $2, descripcion = $3, detalle_ventas_id = $4, fecha = $5 WHERE id = $6";

    const values = [
      usuario_id,
      productos,
      descripcion,
      detalle_ventas_id,
      fecha,
      id,
    ];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw { code: 404, message: "No existe ningúna venta con este id" };
    }
  } catch (error) {
    throw new Error("ha fallado la consulta del rol", { cause: error });
  }
};

module.exports = {
  obtenerventas,
  Createventas,
  modificarventas,
};
