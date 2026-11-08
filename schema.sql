SET NAMES 'utf8mb4';

CREATE TABLE `certificacion` (
	`id` varchar(50) PRIMARY KEY,
	`url` varchar(255) NOT NULL,
	`descripcion` varchar(650) NOT NULL,
	`nombre` varchar(50) NOT NULL
);

CREATE TABLE `criterio` (
	`id` varchar(20) PRIMARY KEY,
	`tipo` varchar(20) NOT NULL,
	`pregunta` varchar(100) NOT NULL
);

CREATE TABLE `criterio_calificacion` (
	`id_criterio` varchar(10) NOT NULL,
	`huella_usuario` varchar(40) NOT NULL,
	`codigo_producto` varchar(50) NOT NULL,
	`comentario` varchar(250) NOT NULL
);

CREATE TABLE `duda` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`codigo_producto` varchar(20) NOT NULL,
	`pregunta` varchar(100) NOT NULL
);

CREATE TABLE `producto` (
	`codigo` varchar(50) PRIMARY KEY,
	`fecha_registro` timestamp NOT NULL DEFAULT (now()),
	`nombre` varchar(100) NOT NULL
);

CREATE TABLE `reseña` (
	`huella_usuario` varchar(40) NOT NULL,
	`codigo_producto` varchar(50) NOT NULL,
	CONSTRAINT PRIMARY KEY(`huella_usuario`,`codigo_producto`)
);

CREATE TABLE `respuesta` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`id_duda` int NOT NULL,
	`respuesta` varchar(250) NOT NULL
);

CREATE TABLE `usuario` (
	`huella` varchar(40) PRIMARY KEY
);

CREATE INDEX `idx_fecha` ON `producto` (`fecha_registro`);
ALTER TABLE `criterio_calificacion` ADD CONSTRAINT `fk_criterio_calificacion_usuario` FOREIGN KEY (`huella_usuario`) REFERENCES `usuario`(`huella`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `criterio_calificacion` ADD CONSTRAINT `fk_criterio_calificacion_producto` FOREIGN KEY (`codigo_producto`) REFERENCES `producto`(`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `criterio_calificacion` ADD CONSTRAINT `fk_criterio_calificacion_criterio` FOREIGN KEY (`id_criterio`) REFERENCES `criterio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `duda` ADD CONSTRAINT `fk_duda_producto` FOREIGN KEY (`codigo_producto`) REFERENCES `producto`(`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `reseña` ADD CONSTRAINT `fk_reseña_usuario` FOREIGN KEY (`huella_usuario`) REFERENCES `usuario`(`huella`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `respuesta` ADD CONSTRAINT `fk_respuesta_duda` FOREIGN KEY (`id_duda`) REFERENCES `duda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;