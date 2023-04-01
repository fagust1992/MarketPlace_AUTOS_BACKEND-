const express = require("express");
const app = require("./app");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const productorouter = require("./src/routes/productos");
const {
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} = require("./src/controllers/usuarioController");
const {
  login,
  agregarusuario,
  modificarpassword,
} = require("./src/controllers/auth");
app.use(cors());
app.use(express.json());
app.use("/rol", require("./src/routes/Rol"));
app.use("/productos", productorouter);

app.post("/registrarse", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
});

app.put("/usuario/:id", async (request, response) => {
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
app.put("/password/:id", async (request, response) => {
  const { id } = request.params;
  const { password } = request.body;
  await modificarpassword(password, id);
  response.send("constaseña cambiada");
});
app.delete("/usuario/:id", async (request, response) => {
  const { id } = request.params;
  await eliminarUsuario(id);
  response.send("Post elimando");
});

app.get("/usuarios", async (request, response) => {
  try {
    const product = await obtenerUsuarios();
    response.json(product);
  } catch (error) {
    console.error("Error al intentar traer  usuarios :", error);
    response.status(500).json({ message: "Error al intentar traer usuarios" });
  }
});
const on = () => {
  try {
    app.listen(3000, console.log("encedido el servidor"));
  } catch (error) {
    throw new Error("ha fallado el servidor", { cause: error });
  }
};

on();
