const ventasController = require("./ventasController");
// const { Pool } = require("pg");
const { credenciales } = require("../db/credentials");

//prueba 1
test("debe devolver 404 si no se encuentra la venta", async () => {
  const req = {
    params: {
      id: "/* Add an id that does not exist on the app */",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ventasController.getVenta(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

//prueba 2
test("debería devolver 400 si el campo del nombre del cliente está vacío", async () => {
  const req = {
    body: {
      /* Agregar un cuerpo de solicitud incompleto */
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ventasController.createVenta(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

//Se deben completar los campos que se indican en los comentarios según los requerimientos del código.
