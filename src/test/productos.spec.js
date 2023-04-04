const { Pool } = require("pg");
const { credenciales } = require("../db/credentials");
const {
  obtenerProducto,
  agregarproducto,
  modificarproducto,
} = require("../controllers/productosController");

describe("productosController", () => {
  let pool;

  beforeAll(() => {
    pool = new Pool(credenciales);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("obtenerProducto", () => {
    test("debe devolver un array de productos", async () => {
      const productos = await obtenerProducto(pool);
      expect(Array.isArray(productos)).toBe(true);
    });

    describe("agregarproducto", () => {
      test("debe agregar un producto a la base de datos", async () => {
        const result = await agregarproducto(
          "sku-009",
          "auto",
          "mazda1",
          100,
          "imagen.png"
        );
        expect(result.rowCount).toBe(1);
      });
    });

    test("debe lanzar un error si el SKU ya existe", async () => {
      const error = new Error("ha fallado la consulta");
      error.cause = {
        constraint: "productos_sku_key",
      };
      await expect(
        agregarproducto(
          pool,
          "sku-025",
          "camion",
          "chevrolet",
          100,
          "imagen.png"
        )
      ).rejects.toEqual(error); // SE DEBE DIGITAR UN PRODUCTO PARA QUE LA PRUEBA FUNCIONES
    });
  });
});
// })
