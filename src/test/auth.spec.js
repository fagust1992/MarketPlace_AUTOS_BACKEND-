const { Pool } = require("pg");
const { credenciales } = require("../db/credentials");

const { login, agregarusuario } = require("../controllers/auth");

describe("pruebas para las funciones de auth", () => {
  describe("pruebas para la función login", () => {
    test("debe devolver un error si las credenciales son incorrectas", async () => {
      const result = await login(
        "francicoaugust19921992@gmail.com",
        "contraseñaincorrecta"
      );
      expect(
        login("francicoaugust19921992@gmail.com", "contraseñaincorrecta")
      ).rejects.toThrow("Las credenciales son incorrectas");
    });

    test("debe agregar un usuario correctamente", async () => {
      const result = await agregarusuario(
        "carmen",
        "gonzales",
        "carmengonzalez@gmail.com",
        "234",
        "Calle 113",
        "23234",
        0,
        0,
        1,
        1,
        1,
        "imagen5.jpg"
      );
      expect(result).toMatchObject({ rowCount: 1 });
    });
  });
});
