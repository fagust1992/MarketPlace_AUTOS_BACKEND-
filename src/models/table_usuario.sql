--TABLE USER---
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY ,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(10) NOT NULL,
  direccion  VARCHAR(50) NOT NULL,  
  telefono  VARCHAR(50) NOT NULL ,  
  Likes   INTEGER  NOT NULL,
  ventas VARCHAR(20) NOT NULL,
  rol_id INTEGER NOT null,
  producto_id  INTEGER NOT NULL, 
  ventas_id INTEGER NOT NULL,
  imagen VARCHAR(1000) NOT NULL
);


 INSERT INTO  usuario(nombre,apellido,email,password,direccion ,telefono,likes ,ventas,rol_id ,producto_id ,ventas_id,imagen)
VALUES ( 'nombre','apellido','francicoaugust19921992@gmail.com','fagust','direccion','telefono',0,'ventas',1,1,1,'imagen');

ALTER TABLE usuario ADD FOREIGN KEY (ventas_id) REFERENCES ventas(id),
  ADD FOREIGN KEY (producto_id) REFERENCES productos(id), 
  ADD FOREIGN KEY (rol_id) REFERENCES rol(id);