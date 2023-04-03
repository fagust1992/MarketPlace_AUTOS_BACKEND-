const express = require("express");
const router = express.Router();
const {
  obtenerDetalleVentas,
  crearDetalleVenta,
  actualizarDetalleVenta,
} = require("../controllers/detalle_ventaController");

router.get("/", async (request, response) => {
  try {
    const detalle_venta = await obtenerDetalleVentas();
    response.json(detalle_venta);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error al intentar traer detalle venta" });
    throw new Error("ha fallado la conexion ", { cause: error });
  }
});

router.post("/add", async (request, response) => {
  try {
    const { producto_id, ventas_id, cantidad, valor_venta } = request.body;
    const detalleVenta = await crearDetalleVenta(
      producto_id,
      ventas_id,
      cantidad,
      valor_venta
    );
    response.send("detalle venta agregado");
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { producto_id, ventas_id, cantidad, valor_venta } = request.body;

  try {
    const detalleVentaActualizado = await actualizarDetalleVenta(
      id,
      producto_id,
      ventas_id,
      cantidad,
      valor_venta
    );

    response.send("detalle venta actualizado");
  } catch (error) {
    response.status(error.code || 500).json({ message: error.message });
  }
});

module.exports = router;
