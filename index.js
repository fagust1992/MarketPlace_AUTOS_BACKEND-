const app = require("./app");
const { obtenerRol } = require("./src/controllers/rolController");
const { obtenerProducto } = require("./src/controllers/productosController");

app.get("/rol", async (request, response) => {
  try {
    const rol = await obtenerRol();
    response.json(rol);
  } catch (error) {
    response.status(500).json({ message: "Error al intentar traer roles" });
    throw new Error("ha fallado la conexion ", { cause: error });
  }
});

app.get("/productos", async (request, response) => {
  try {
    const product = await obtenerProducto();
    response.json(product);
  } catch (error) {
    console.error("Error al intentar traer productos :", error);
    response.status(500).json({ message: "Error al intentar traer productos" });
  }
});
app.listen(3000, console.log("encedido el servidor"));
