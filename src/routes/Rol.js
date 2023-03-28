const express = require("express");
const router = express.Router();

// Importar funciones del controlador de roles
const { obtenerRol } = require("../controllers/rolController");

router.get("/", async (request, response) => {
  try {
    const rol = await obtenerRol();
    response.json(rol);
  } catch (error) {
    response.status(500).json({ message: "Error al intentar traer roles" });
    throw new Error("ha fallado la conexion ", { cause: error });
  }
});

module.exports = router;
