
--TABLE ROL---
CREATE TABLE rol (
 id SERIAL PRIMARY KEY,
 rol VARCHAR(15) NOT NULL,
roleDescription VARCHAR(50) NOT NULL
);
--dato prueba--
 INSERT INTO rol (rol, roleDescription)
VALUES ( 'ADM','description');