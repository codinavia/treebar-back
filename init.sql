-- Certificaciones
INSERT INTO certificacion (id, url, descripcion, nombre)
VALUES (
    'ESR',
    'https://esr.cemefi.org/publicacion',
    CONCAT(
        'El Distintivo Empresa Socialmente Responsable (ESR), es un proceso sistémico para medir y comparar el nivel de desarrollo de las buenas prácticas de responsabilidad social a través de indicadores en los ámbitos ambiental, social y de gobernanza (ASG) en las empresas.',
        CHAR(10), CHAR(10),        
        'Está referenciado con la legislación nacional y normativas internacionales y contempla la revisión de evidencias para respaldar el grado de cumplimiento de responsabilidad social y sostenibilidad de las compañías privadas, con el fin de distinguirlas con un ícono de valor que las destaca y diferencia de otras empresas que operan en México y América Latina.'
    ),
    'Empresa Socialmente Responsable (ESR)'
);

INSERT INTO certificacion (id, url, descripcion, nombre)
VALUES (
    'EPEAT',
    'https://www.epeat.net/product-finder',
    CONCAT (
        'Es una etiqueta ecológica de confianza a nivel mundial que ofrece un impacto medible y facilita a las organizaciones la compra de productos electrónicos que son mejores para las personas, el planeta y la rentabilidad.',
        CHAR(10), CHAR(10),
        'EPEAT es administrada por el Global Electronics Council® (GEC), una organización sin fines de lucro impulsada por su misión y dedicada a un mundo con tecnología electrónica únicamente sostenible que promueva el bienestar de las personas y del planeta. Juntos podemos lograr que el 100 % de los productos electrónicos sean sostenibles para el año 2050, para todos, en todas partes.'
    ),
    'EPEAT'
);

-- Criterios
INSERT INTO `criterio` (`id`, `tipo`, `pregunta`)
VALUES
  ('uso01', 'uso', '¿Cómo utiliza el producto?'),
  ('uso02', 'uso', '¿Para qué actividades lo emplea?'),
  ('frec01', 'frec', '¿Con qué frecuencia lo usa?'),
  ('dura01', 'dura', '¿Cuánto tiempo lleva usándolo?'),
  ('dura02', 'dura', '¿Ha presentado desgaste?'),
  ('repa01', 'repa', '¿Fue fácil conseguir refacciones?'),
  ('repa02', 'repa', '¿Ha necesitado repararlo?'),
  ('sust01', 'sust', '¿El producto es amigable con el medio ambiente?'),
  ('dese01', 'dese', '¿Cumple lo prometido por el fabricante?');