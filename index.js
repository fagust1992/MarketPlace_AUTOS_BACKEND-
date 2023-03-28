const express = require("express");
const app = require("./app");

const productorouter = require("./src/routes/productos");

app.use(express.json());
app.use("/rol", require("./src/routes/Rol"));
app.use("/productos", productorouter);

const on = () => {
  try {
    app.listen(3000, console.log("encedido el servidor"));
  } catch (error) {
    throw new Error("ha fallado el servidor", { cause: error });
  }
};

on();
