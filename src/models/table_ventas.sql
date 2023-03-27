CREATE TABLE ventas (
 id SERIAL PRIMARY KEY,
 usuario_id INTEGER NOT NULL,
 productos VARCHAR(15) NOT NULL,
 descripcion VARCHAR(15) NOT NULL,
 detalle_ventas_id INTEGER NOT NULL
 fecha DATE NOT NULL
);
