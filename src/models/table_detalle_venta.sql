-- table detalle venta-- 
CREATE TABLE detalle_Ventas (
id SERIAL PRIMARY KEY,
producto_id  INTEGER NOT NULL,
ventas_id   INTEGER NOT NULL,
cantidad    INTEGER NOT NULL,
valor_venta   INTEGER NOT NULL
);

INSERT INTO detalle_Ventas (producto_id, ventas_id,cantidad, valor_venta)
VALUES ( 1,1, 1,4000);

