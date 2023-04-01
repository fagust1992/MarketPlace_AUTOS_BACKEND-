const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  login,
  agregarusuario,
  modificarpassword,
} = require("../controllers/auth");

router.post("/registrarse", async (req, res) => {
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
  } = req.body;

  try {
    await agregarusuario(
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
      imagen
    );
    res.send("usuario registardo correctamente");
  } catch (error) {
    throw new Error("ha fallado la consulta", { cause: error });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
  }
  try {
    await login(email, password);
    const token = jwt.sign({ email }, "az_AZ");
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }

  router.put("/password/:id", async (request, response) => {
    const { id } = request.params;
    const { password } = request.body;
    await modificarpassword(password, id);
    response.send("constaseña cambiada");
  });
});
module.exports = router;
