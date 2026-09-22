import {
  mysqlTable,
  int,
  varchar,
  float,
  date,
  index,
  foreignKey,
  primaryKey
} from 'drizzle-orm/mysql-core';
import { defineRelations } from 'drizzle-orm';

export const empresa = mysqlTable(
  'empresa', 
  {
  id: int('id').autoincrement().primaryKey(),
  nombre: varchar('nombre', { length: 50 }).notNull(),
});

export const usuario = mysqlTable(
  'usuario', 
  {
  huella_digital: varchar('huella_digital', { length: 255 }).notNull().primaryKey(),
});

export const producto = mysqlTable(
  'producto', 
  {  
  codigo: varchar('codigo', { length: 50 }).notNull().primaryKey(),
  nombre: varchar('nombre', { length: 50 }).notNull(),
  categoria: varchar('categoria', { length: 50 }).notNull(),
  id_empresa: int('id_empresa').notNull(),
}, (table) => [
  foreignKey({
    name: 'fk_producto_empresa',
    columns: [table.id_empresa],
    foreignColumns: [empresa.id],
  })
    .onDelete('cascade')
    .onUpdate('cascade'),
]);

export const reseña = mysqlTable(
  'reseña', 
  {
    huella_digital: varchar('huella_digital', { length: 255 }).notNull(),
    codigo_producto: varchar('codigo_producto', { length: 50 }).notNull(),
    calificacion_promedio: float('calificacion_promedio').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_reseña_usuario',
      columns: [table.huella_digital],
      foreignColumns: [usuario.huella_digital],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    primaryKey({ columns: [table.huella_digital, table.codigo_producto] }),
  ],
);

export const certificacion = mysqlTable(
  'certificacion',
  {
    codigo_certificacion: varchar('codigo_certificacion', { length: 50 }).notNull().primaryKey(),
    categoria: varchar('categoria', { length: 100 }).notNull(),
    ciclo: varchar('ciclo', { length: 50 }).notNull(),
    organizacion: int('organizacion').notNull(),
  }
);

export const empresa_certificacion = mysqlTable(
  'empresa certificacion',
  {
    id_empresa: int('id_empresa').notNull(),
    codigo_certificacion: varchar('codigo_certificacion', { length: 50 }).notNull(),
    fecha_adquisicion: date('fecha_adquisicion').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_empresa_certificacion_empresa',
      columns: [table.id_empresa],
      foreignColumns: [empresa.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey({
      name: 'fk_empresa_certificacion_certificacion',
      columns: [table.codigo_certificacion],
      foreignColumns: [certificacion.codigo_certificacion],
    })
      .onDelete('cascade')
      .onUpdate('cascade')
  ],
);

export const criterio = mysqlTable(
  'criterio',
  {
    id_criterio: int('id_criterio').autoincrement().primaryKey(),
    nombre: varchar('nombre', { length: 50 }).notNull(),
    descripcion: varchar('descripcion', { length: 255 }).notNull(),
  }
);

export const criterio_calificacion = mysqlTable(
  'criterio calificacion',
  {
    id_criterio: int('id_criterio').notNull(),
    huella_digital: varchar('huella_digital', { length: 255 }).notNull(),
    codigo_producto: varchar('codigo_producto', { length: 50 }).notNull(),
    comentario: varchar('comentario', { length: 500 }).notNull(),
    calificacion: float('calificacion').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_criterio_calificacion_usuario',
      columns: [table.huella_digital],
      foreignColumns: [usuario.huella_digital],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey({
      name: 'fk_criterio_calificacion_producto',
      columns: [table.codigo_producto],
      foreignColumns: [producto.codigo],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    foreignKey({
      name: 'fk_criterio_calificacion_criterio',
      columns: [table.id_criterio],
      foreignColumns: [criterio.id_criterio],
    })
      .onDelete('cascade')
      .onUpdate('cascade')  
    ],
);

export const duda = mysqlTable(
  'duda',
  {
    id_duda: int('id_duda').autoincrement().primaryKey(),
    codigo_producto: varchar('codigo_producto', { length: 50 }).notNull(),
    pregunta: varchar('pregunta', { length: 500 }).notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_duda_producto',
      columns: [table.codigo_producto],
      foreignColumns: [producto.codigo],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  ],
);

export const respuesta = mysqlTable(
  'respuesta',
  {
    id_respuesta: int('id_respuesta').autoincrement().primaryKey(),
    id_duda: int('id_duda').notNull(),
    respuesta: varchar('respuesta', { length: 500 }).notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_respuesta_duda',
      columns: [table.id_duda],
      foreignColumns: [duda.id_duda],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  ],
);

export const relations = defineRelations(
  {
    empresa,
    usuario,
    producto,
    reseña,
    certificacion,
    empresa_certificacion,
    criterio,
    criterio_calificacion,
    duda,
    respuesta,
  },
  (r) => ({
    empresa: {
      productos: r.many.producto(),
      certificaciones: r.many.empresa_certificacion(),
    },
    usuario: {
      reseñas: r.many.reseña(),
      calificacionesCriterio: r.many.criterio_calificacion(),
    },
    producto: {
      empresa: r.one.empresa({
        from: r.producto.id_empresa,
        to: r.empresa.id,
      }),
      calificacionesCriterio: r.many.criterio_calificacion(),
      dudas: r.many.duda(),
    },
    reseña: {
      usuario: r.one.usuario({
        from: r.reseña.huella_digital,
        to: r.usuario.huella_digital,
      }),
    },
    certificacion: {
      empresas: r.many.empresa_certificacion(),
    },
    empresa_certificacion: {
      empresa: r.one.empresa({
        from: r.empresa_certificacion.id_empresa,
        to: r.empresa.id,
      }),
      certificacion: r.one.certificacion({
        from: r.empresa_certificacion.codigo_certificacion,
        to: r.certificacion.codigo_certificacion,
      }),
    },
    criterio: {
      calificaciones: r.many.criterio_calificacion(),
    },
    criterio_calificacion: {
      usuario: r.one.usuario({
        from: r.criterio_calificacion.huella_digital,
        to: r.usuario.huella_digital,
      }),
      producto: r.one.producto({
        from: r.criterio_calificacion.codigo_producto,
        to: r.producto.codigo,
      }),
      criterio: r.one.criterio({
        from: r.criterio_calificacion.id_criterio,
        to: r.criterio.id_criterio,
      }),
    },
    duda: {
      producto: r.one.producto({
        from: r.duda.codigo_producto,
        to: r.producto.codigo,
      }),
      respuestas: r.many.respuesta(),
    },
    respuesta: {
      duda: r.one.duda({
        from: r.respuesta.id_duda,
        to: r.duda.id_duda,
      }),
    },
  }),
);
