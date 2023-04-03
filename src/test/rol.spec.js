const { Pool } = require("pg");
const { credenciales } = require("../db/credentials");

const {
  obtenerRoles,
  CreateRol,
  modificarRol,
  eliminarRol,
} = require("../controllers/rolController");

describe("RolController", () => {
  let pool;

  beforeAll(() => {
    pool = new Pool(credenciales);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("obtenerRoles", () => {
    it("devuelve una lista de roles", async () => {
      const roles = await obtenerRoles();
      expect(Array.isArray(roles)).toBe(true);
    });
  });

  describe("CreateRol", () => {
    it("crea un nuevo rol en la base de datos", async () => {
      const rol = "Nuevo Rol";
      const roledescription = "Descripción del nuevo rol";
      await CreateRol(rol, roledescription);
      const consulta =
        "SELECT * FROM rol WHERE rol = $1 AND roledescription = $2";
      const values = [rol, roledescription];
      const { rows } = await pool.query(consulta, values);
      expect(rows.length).toBe(1);
    });
  });

  describe("modificarRol", () => {
    it("actualiza un rol existente en la base de datos", async () => {
      const rol = "Rol Modificado";
      const roledescription = "Descripción del rol modificado";
      const consulta =
        "INSERT INTO rol (rol, roledescription) VALUES ($1, $2)  id";
      const values = ["Rol Original", "Descripción del rol original"];
      const { rows } = await pool.query(consulta, values);
      const id = rows[0].id;
      await modificarRol(rol, roledescription, id);
      const selectConsulta = "SELECT * FROM rol WHERE id = $1";
      const selectValues = [id];
      const { rows: selectedRows } = await pool.query(
        selectConsulta,
        selectValues
      );
      expect(selectedRows.length).toBe(1);
      expect(selectedRows[0].rol).toBe(rol);
      expect(selectedRows[0].roledescription).toBe(roledescription);
    });

    it("lanza un error si el rol no existe", async () => {
      const rol = "Rol Inexistente";
      const roledescription = "Descripción del rol inexistente";
      const id = 123456789;
      await expect(modificarRol(rol, roledescription, id)).rejects.toThrow(
        "ha fallado la consulta del rol"
      );
    });
  });

  describe("eliminarRol", () => {
    it("elimina un rol existente en la base de datos", async () => {
      const consulta =
        "INSERT INTO rol (rol, roledescription) VALUES ($1, $2)  id";
      const values = ["Rol a Eliminar", "Descripción del rol a eliminar"];
      const { rows } = await pool.query(consulta, values);
      const id = rows[0].id;
      await eliminarRol(id);
      const selectConsulta = "SELECT * FROM rol WHERE id = $1";
      const selectValues = [id];
      const { rows: selectedRows } = await pool.query(
        selectConsulta,
        selectValues
      );
      expect(selectedRows.length).toBe(0);
    });
  });
});
