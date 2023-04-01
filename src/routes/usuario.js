const express = require("express");
const router = express.Router();
const {
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarioController");

router.get("/", async (request, response) => {
  try {
    const product = await obtenerUsuarios();
    response.json(product);
  } catch (error) {
    console.error("Error al intentar traer  usuarios :", error);
    response.status(500).json({ message: "Error al intentar traer usuarios" });
  }
});
router.put("/usuario/:id", async (request, response) => {
  const { id } = request.params;
  const {
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
  } = request.body;

  try {
    await modificarUsuario(
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
    );

    response.send("usuario  modificado correctamente");
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error al intentar modificar usuario" });
  }
});
router.delete("/usuario/:id", async (request, response) => {
  const { id } = request.params;
  await eliminarUsuario(id);
  response.send("Post elimando");
});
module.exports = router;
