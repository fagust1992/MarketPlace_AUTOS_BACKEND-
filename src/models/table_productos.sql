--TABLE PRODUCTS---
CREATE TABLE productos (
id SERIAL PRIMARY KEY,
Sku VARCHAR(15) NOT NULL UNIQUE,
nombre_producto  VARCHAR(15) NOT NULL,
descripcion_producto VARCHAR(15) NOT NULL,
precio INTEGER NOT NULL,
imagen VARCHAR(1000) NOT NULL
);
--dato prueba--
INSERT INTO productos( Sku ,nombre_producto,descripcion_producto,precio,imagen) VALUES ('evex1300', 'estanque', 'descripcion', 8000000, 'imagen estanque');