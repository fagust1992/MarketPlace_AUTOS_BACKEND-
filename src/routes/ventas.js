const express = require("express");
const router = express.Router();

const {
  obtenerventas,
  Createventas,
  modificarventas,
  eliminarventas,
} = require("../controllers/ventasController");

router.get("/", async (request, response) => {
  try {
    const ventas = await obtenerventas();
    response.json(ventas);
  } catch (error) {
    console.error("Error al intentar traer  vents :", error);
    response.status(500).json({ message: "Error al intentar traer ventas" });
  }
});
router.post("/add_ventas", async (request, response) => {
  const { usuario_id, productos, descripcion, detalle_ventas_id, fecha } =
    request.body;

  try {
    await Createventas(
      usuario_id,
      productos,
      descripcion,
      detalle_ventas_id,
      fecha
    );
  } catch (error) {
    console.error("Error al intentar crear ventas :", error);
    response.status(500).json({ message: "Error al intentar agregar ventas" });
  }
});
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { usuario_id, productos, descripcion, detalle_ventas_id, fecha } =
    request.body;
  try {
    await modificarventas(
      usuario_id,
      productos,
      descripcion,
      detalle_ventas_id,
      fecha,
      id
    );
    response.send("venta modificada correctamente");
  } catch (error) {
    response.status(500).json({ message: "Error al intentar modificar venta" });
  }
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await eliminarventas(id);
    response.send("rol elimando");
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error al intentar eliminar productos" });
  }
});
module.exports = router;
