CREATE TABLE ventas (
 id SERIAL PRIMARY KEY,
 usuario_id INTEGER NOT NULL,
 productos VARCHAR(15) NOT NULL,
 descripcion VARCHAR(15) NOT NULL,
 detalle_ventas_id INTEGER NOT NULL,
 fecha DATE NOT NULL
);
 INSERT INTO ventas(usuario_id, productos,descripcion,detalle_ventas_id,fecha)
VALUES ( 1,'productos','descripcion',1,'30/03/2023');