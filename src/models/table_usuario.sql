--TABLE USER---
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY ,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(10) NOT NULL,
  direccion  VARCHAR(50) NOT NULL,  
  telefono  VARCHAR(50) NOT NULL ,  
  Likes   BOOLEAN  NOT NULL,
  ventas VARCHAR(20) NOT NULL,
  rol_id INTEGER NOT null,
  producto_id  INTEGER NOT NULL, 
  ventas_id INTEGER NOT NULL,
  imagen VARCHAR(1000) NOT NULL
);