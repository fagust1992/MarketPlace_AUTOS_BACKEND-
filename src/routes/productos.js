const express = require("express");
const router = express.Router();

const {
  obtenerProducto,
  agregarproducto,
  modificarproducto,
} = require("../controllers/productosController");
const { validationMiddleware } = require("../middlewares/validatormiddelware");

router.get("/", async (request, response) => {
  try {
    const product = await obtenerProducto();
    response.json(product);
  } catch (error) {
    console.error("Error al intentar traer productos :", error);
    response.status(500).json({ message: "Error al intentar traer productos" });
  }
});

router.post("/publicar", async (request, response) => {
  try {
    const { sku, nombre_producto, descripcion_producto, precio, imagen } =
      request.body;

    await agregarproducto(
      sku,
      nombre_producto,
      descripcion_producto,
      precio,
      imagen
    );
    response.send("Producto agregado");
  } catch (error) {
    console.error("Error al intentar traer productos :", error);
    response.status(500).json({ message: "Error al intentar traer productos" });
  }
});

router.put("/:id", validationMiddleware, async (request, response) => {
  const { id } = request.params;
  const { sku, nombre_producto, descripcion_producto, precio, imagen } =
    request.body;
  try {
    await modificarproducto(
      sku,
      nombre_producto,
      descripcion_producto,
      precio,
      imagen,
      id
    );
    response.json("producto modificado correctamente");
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error al intentar modificar productos" });
  }
});

module.exports = router;
