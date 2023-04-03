const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  login,
  agregarusuario,
  modificarpassword,
  getuser,
  getInformation_tables,
  getInformation_productos_ventas_detalle_ventas,
} = require("../controllers/auth");
// Middleware para verificar el token
const token_verificacion = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    jwt.verify(token, "az_AZ");

    next();
  } catch (error) {
    res.status(error.code || 498).send("error al traer token");
  }
};
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
    return res.status(400).send("Se requiere correo electrónico y contraseña");
  }
  try {
    await login(email, password);

    const token = jwt.sign({ email, password }, "az_AZ");

    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});
// Ruta protegida por token
// Ruta protegida por token
router.get("/perfil", token_verificacion, async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    const { email } = jwt.decode(token);
    const informacion = await getInformation_productos_ventas_detalle_ventas();

    res.json(informacion);
  } catch (error) {
    res.status(error.code || 498).send(error);
  }
});

router.put("/password/:id", async (request, response) => {
  const { id } = request.params;
  const { password } = request.body;
  await modificarpassword(password, id);
  response.send("contraseña cambiada");
});

router.post("/usuario", async (request, response) => {
  const { email } = request.body;

  try {
    const user = await getuser(email);
    response.json(user);
  } catch (error) {
    console.error("Error al intentar traer datos de usuario :", error);
    response
      .status(500)
      .json({ message: "Error al intentar traer datos de usuario" });
  }
});
router.get("/information", async (request, response) => {
  try {
    const information = await getInformation_tables();
    response.json(information);
  } catch (error) {
    console.error("Error al intentar traer  usuarios :", error);
    response.status(500).json({ message: "Error al intentar traer usuarios" });
  }
});
router.get(
  "/informacion_productos_ventas_detalle_ventas",
  async (request, response) => {
    try {
      const information =
        await getInformation_productos_ventas_detalle_ventas();
      response.status(200).json(information);
    } catch (error) {
      response.status(error.code || 500).json({ message: error.message });
    }
  }
);

module.exports = router;
