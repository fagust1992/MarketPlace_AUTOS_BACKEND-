const { Pool } = require("pg");
const { credenciales } = require("../db/credentials");

const pool = new Pool(credenciales);

// Obtener todos los detalles de ventas///
const obtenerDetalleVentas = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM detalle_ventas");
    return rows;
  } catch (error) {
    throw new Error("Error al obtener los detalles de ventas", {
      cause: error,
    });
  }
};

// Crear un nuevo detalle de venta///
const crearDetalleVenta = async (
  producto_id,
  ventas_id,
  cantidad,
  valor_venta
) => {
  try {
    const consulta =
      "INSERT INTO detalle_ventas (producto_id, ventas_id, cantidad, valor_venta) VALUES ($1, $2, $3, $4)";
    const valores = [producto_id, ventas_id, cantidad, valor_venta];
    const { rows } = await pool.query(consulta, valores);
    return rows[0];
  } catch (error) {
    throw new Error("Error al crear un nuevo detalle de venta", {
      cause: error,
    });
  }
};

// Actualizar un detalle de venta existente//
const actualizarDetalleVenta = async (
  id,
  producto_id,
  ventas_id,
  cantidad,
  valor_venta
) => {
  try {
    const consulta =
      "UPDATE detalle_ventas SET producto_id = $1, ventas_id = $2, cantidad = $3, valor_venta = $4 WHERE id = $5";
    const valores = [producto_id, ventas_id, cantidad, valor_venta, id];
    const { rowCount, rows } = await pool.query(consulta, valores);

    if (rowCount === 0) {
      throw {
        code: 404,
        message: "No existe ningún detalle de venta con este id",
      };
    }

    return rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el detalle de venta", {
      cause: error,
    });
  }
};

// Eliminar un detalle de venta existente

module.exports = {
  obtenerDetalleVentas,
  crearDetalleVenta,
  actualizarDetalleVenta,
};
