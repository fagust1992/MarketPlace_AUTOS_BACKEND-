const express = require("express");
const app = require("./app");
const cors = require("cors");

const productorouter = require("./src/routes/productos");
const usuarios = require("./src/routes/usuario");
const auth = require("./src/routes/auth");

app.use(cors());
app.use(express.json());
app.use("/rol", require("./src/routes/Rol"));
app.use("/productos", productorouter);
app.use("/usuarios", usuarios);
app.use("/auth", auth);

const on = () => {
  try {
    app.listen(3000, console.log("encedido el servidor"));
  } catch (error) {
    throw new Error("ha habido un problema con  el servidor", { cause: error });
  }
};

on();
