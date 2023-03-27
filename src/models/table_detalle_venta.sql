-- table detalle venta-- 
CREATE TABLE detalle_Ventas (
id SERIAL PRIMARY KEY,
producto_id  INTEGER NOT NULL,
ventas_id   INTEGER NOT NULL,
cantidad    INTEGER NOT NULL,
valor_venta   INTEGER NOT NULL
);