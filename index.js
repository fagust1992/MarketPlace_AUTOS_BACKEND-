const express = require("express");
const app = require("./app");

const jwt = require("jsonwebtoken");
const productorouter = require("./src/routes/productos");
const { credenciales1 } = require("./src/controllers/usuarioController");

app.use(express.json());
app.use("/rol", require("./src/routes/Rol"));
app.use("/productos", productorouter);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await credenciales1(email, password);
    const token = jwt.sign({ email }, "az_AZ");
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
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
