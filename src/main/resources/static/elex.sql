-- Acceso a MySQL: root / root
-- Materias -> pág. 223
-- Documentos -> pág. 208
-- Tipos Expediente -> pág 66 y varias mas
-- Actuaciones -> pág 36

DROP DATABASE IF EXISTS elex;
CREATE DATABASE IF NOT EXISTS elex
CHARACTER SET utf8mb4
	COLLATE utf8mb4_spanish_ci;
    
use elex;

-- 1. Tabla Tipos Expedientes AÑADIR MAS CAMPOS
CREATE TABLE tipos_expediente
(
	id TINYINT NOT NULL UNIQUE AUTO_INCREMENT,
    materia VARCHAR (20) UNIQUE NOT NULL,
    borrado BOOLEAN  DEFAULT 0,
    PRIMARY KEY PK_tipos_expediente (id)
)
COMMENT "Tabla Principal Tipos -> Expedientes";

-- 2. Tabla Expedientes AÑADIR MAS CAMPOS
CREATE TABLE expedientes
(
	id INT NOT NULL UNIQUE AUTO_INCREMENT,
    nig VARCHAR(50) NOT NULL UNIQUE,
    fecha DATE NOT NULL,
    estado ENUM('Pendiente','Enviado','Erróneo') DEFAULT 'Pendiente',
    opciones VARCHAR(70) DEFAULT "",
    descripcion VARCHAR(255) NOT NULL,
    tipo TINYINT NOT NULL,
	borrado BOOLEAN  DEFAULT 0,
    FOREIGN KEY (tipo) REFERENCES tipos_expediente (id),
    PRIMARY KEY PK_expedientes (id)
)
COMMENT "Tabla Principal Expediente";

-- 3. Tabla Actuaciones AÑADIR MÁS CAMPOS
CREATE TABLE actuaciones
(
	id INT NOT NULL UNIQUE AUTO_INCREMENT,
    observaciones VARCHAR(255) NOT NULL,
    finalizado BOOLEAN DEFAULT 0,
    expediente INT NOT NULL,
    fecha DATE NOT NULL,
    usuario VARCHAR(25) NOT NULL,
	responsable1 VARCHAR(25) NOT NULL,
    responsable2 VARCHAR(25) NOT NULL,
    consejeria VARCHAR(25) NOT NULL,
    borrado BOOLEAN  DEFAULT 0,
    FOREIGN KEY (expediente) REFERENCES expedientes (id),
    PRIMARY KEY PK_actuaciones (id)
)
COMMENT "Tabla Principal Actuaciones";

-- 4. Tabla Documentos
CREATE TABLE documentos
(
	id INT NOT NULL UNIQUE AUTO_INCREMENT,
    ruta VARCHAR(255) NOT NULL,
    precio DECIMAL(6,2) NOT NULL,
    expediente INT NOT NULL,
    nombre_documento VARCHAR(25) NOT NULL,
    descripcion VARCHAR(25) NOT NULL,
	borrado BOOLEAN  DEFAULT 0,
	data MEDIUMBLOB,
    FOREIGN KEY (expediente) REFERENCES expedientes (id),
    PRIMARY KEY PK_documentos (id)
)
COMMENT "Tabla Principal Documentos";

-- Insercción en tipos_expediente
INSERT INTO tipos_expediente (materia)
VALUES ("Judicial"),("Asistencia"),("Informe"),("Moción");

-- Insercción en expedientes
INSERT INTO expedientes
(nig, fecha, estado, opciones, descripcion, tipo)
VALUES
("SEV-20240320-001", "2024-03-20", 'Pendiente', "Urgente, Confidencial", "Test1", 1),
("SEV-20240320-002", "2024-03-20", 'Pendiente', "Urgente, Confidencial", "Test1", 1) ,
("SEV-20240320-003", "2024-03-20", 'Enviado', "Urgente", "Test1", 1) ;


-- Insercción de actuaciones 
INSERT INTO actuaciones 
(observaciones, finalizado , expediente, fecha, usuario, responsable1, responsable2, consejeria) 
VALUES 
('Observaciones Ejemplo', 0, 1, '2024-03-20', 'Usuario Ejemplo', 'Responsable Ejemplo', 'Responsable Ejemplo', 'Consejería Ejemplo');

-- Insercción en documentos
INSERT INTO documentos 
(ruta, precio, expediente, nombre_documento, descripcion) 
VALUES 
('documento_SEV-20240320-001_1.pdf', 50.00, 1, 'Documento Ejemploo', 'Descripción Documento');





