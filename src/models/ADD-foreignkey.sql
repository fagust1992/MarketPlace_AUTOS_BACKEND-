-- foreign keys tables--
--- foreign keys table usuario----- -------
ALTER TABLE usuario ADD FOREIGN KEY (ventas_id) REFERENCES ventas(id),
  ADD FOREIGN KEY (producto_id) REFERENCES productos(id), 
  ADD FOREIGN KEY (rol_id) REFERENCES rol(id);

--- foreign keys table ventas----- -------
ALTER TABLE ventas ADD FOREIGN KEY (usuario_id) REFERENCES usuario(id);
 
--- foreigns keys table detalle_ventas----- 
ALTER TABLE detalle_Ventas ADD FOREIGN KEY (producto_id) REFERENCES productos(id),
 ADD FOREIGN KEY (ventas_id) REFERENCES ventas(id);


 ---------------------