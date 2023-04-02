const express = require("express");
const router = express.Router();

// Importar funciones del controlador de roles
const {
  obtenerRoles,
  CreateRol,
  modificarRol,
  eliminarRol,
} = require("../controllers/rolController");

router.get("/", async (request, response) => {
  try {
    const roles = await obtenerRoles();
    response.json(roles);
  } catch (error) {
    response.status(500).json({ message: "Error al intentar traer roles" });
    throw new Error("ha fallado la conexion ", { cause: error });
  }
});

router.post("/add_rol", async (request, response) => {
  const { rol, roledescription } = request.body;

  try {
    await CreateRol(rol, roledescription);
    response.send("rol agregado");
  } catch (error) {
    console.error("Error al intentar traer productos :", error);
    response.status(500).json({ message: "Error al intentar agregar rol" });
  }
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { rol, roledescription } = request.body;
  try {
    await modificarRol(rol, roledescription, id);
    response.send("role modificado correctamente");
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error al intentar modificar productos" });
  }
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await eliminarRol(id);
    response.send("rol elimando");
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error al intentar eliminar productos" });
  }
});

module.exports = router;
