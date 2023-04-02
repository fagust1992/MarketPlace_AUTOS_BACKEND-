const express = require("express");
const router = express.Router();

// Importar funciones del controlador de roles
const { obtenerRol, CreateRol } = require("../controllers/rolController");

router.get("/", async (request, response) => {
  try {
    const rol = await obtenerRol();
    response.json(rol);
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

module.exports = router;
