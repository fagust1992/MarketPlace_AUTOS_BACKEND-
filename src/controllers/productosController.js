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
const createProduct = async (req, res) => {
  const { sku, nombre_producto, descripcion_producto, precio, imgen } =
    req.body;

  try {
    const { rows } = await db.query(
      "INSERT INTO items (sku, nombre_producto, descripcion_producto, precio, imgen) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sku, nombre_producto, descripcion_producto, precio, imgen]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { obtenerProducto, createProduct };
