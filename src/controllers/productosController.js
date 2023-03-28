const { Pool } = require("pg"); // traigo el pool
const { credenciales } = require("../db/credentials");
const pool = new Pool(credenciales); // instancio el pool

const obtenerProducto = async () => {
  try {
    const { rows: productos } = await pool.query("SELECT * FROM productos");
    if (productos.length > 0) {
      console.log(productos);
      return productos;
    }
  } catch (error) {
    throw new Error("ha fallado la conexion con los datos", { cause: error });
  }
};
// doris codigo/// luego prouebo  con un ruta post

const agregarproducto = async (
  sku,
  nombre_producto,
  descripcion_producto,
  precio,
  imagen
) => {
  if (
    (sku != "") &
    (nombre_producto != "") &
    (descripcion_producto != "") &
    (precio != "")
  ) {
    try {
      const consulta =
        "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5)";
      const values = [
        sku,
        nombre_producto,
        descripcion_producto,
        precio,
        imagen,
      ];
      const result = await pool.query(consulta, values);
      console.log(result);
      return result;
    } catch (error) {
      throw new Error("ha fallado la consulta", { cause: error });
    }
  }
};
module.exports = { obtenerProducto, agregarproducto };
