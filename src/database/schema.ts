import {
  mysqlTable,
  int,
  varchar,
  float,
  foreignKey,
  primaryKey
} from 'drizzle-orm/mysql-core';
import { defineRelations } from 'drizzle-orm';

export const usuario = mysqlTable(
  'usuario', 
  {
  huella: varchar('huella', { length: 40 }).notNull().primaryKey(),
});

export const producto = mysqlTable(
  'producto', 
  {  
  codigo: varchar('codigo', { length: 50 }).notNull().primaryKey(),
});

export const reseña = mysqlTable(
  'reseña', 
  {
    huella_usuario: varchar('huella_usuario', { length: 40 }).notNull(),
    codigo_producto: varchar('codigo_producto', { length: 50 }).notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_reseña_usuario',
      columns: [table.huella_usuario],
      foreignColumns: [usuario.huella],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    primaryKey({ 
      columns: [table.huella_usuario, table.codigo_producto] 
    }),
  ],
);

export const certificacion = mysqlTable(
  'certificacion',
  {
    id: varchar('id', { length: 50 }).notNull().primaryKey(),
    url: varchar('url', { length: 255 }).notNull(),
  }
);

export const criterio = mysqlTable(
  'criterio',
  {
    id: varchar('id', { length: 20 }).primaryKey(),
    tipo: varchar('tipo', { length: 20 }).notNull(),
    pregunta: varchar('pregunta', { length: 50 }).notNull(),
  }
);

export const criterio_calificacion = mysqlTable(
  'criterio calificacion',
  {
    id_criterio: varchar('id_criterio', { length: 20 }).notNull(),
    huella_usuario: varchar('huella_usuario', { length: 40 }).notNull(),
    codigo_producto: varchar('codigo_producto', { length: 50 }).notNull(),
    comentario: varchar('comentario', { length: 250 }).notNull(),
    calificacion: float('calificacion').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_criterio_calificacion_usuario',
      columns: [table.huella_usuario],
      foreignColumns: [usuario.huella],
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
      foreignColumns: [criterio.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade')  
    ],
);

export const duda = mysqlTable(
  'duda',
  {
    id: int('id').autoincrement().primaryKey(),
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
    id: int('id').autoincrement().primaryKey(),
    id_duda: int('id_duda').notNull(),
    respuesta: varchar('respuesta', { length: 500 }).notNull(),
  },
  (table) => [
    foreignKey({
      name: 'fk_respuesta_duda',
      columns: [table.id_duda],
      foreignColumns: [duda.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  ],
);

export const relations = defineRelations(
  {
    usuario,
    producto,
    reseña,
    certificacion,
    criterio,
    criterio_calificacion,
    duda,
    respuesta,
  },
  (r) => ({
    usuario: {
      reseñas: r.many.reseña(),
      calificacionesCriterio: r.many.criterio_calificacion(),
    },
    producto: {
      calificacionesCriterio: r.many.criterio_calificacion(),
      dudas: r.many.duda(),
    },
    reseña: {
      usuario: r.one.usuario({
        from: r.reseña.huella_usuario,
        to: r.usuario.huella,
      }),
    },
    criterio: {
      calificaciones: r.many.criterio_calificacion(),
    },
    criterio_calificacion: {
      usuario: r.one.usuario({
        from: r.criterio_calificacion.huella_usuario,
        to: r.usuario.huella,
      }),
      producto: r.one.producto({
        from: r.criterio_calificacion.codigo_producto,
        to: r.producto.codigo,
      }),
      criterio: r.one.criterio({
        from: r.criterio_calificacion.id_criterio,
        to: r.criterio.id,
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
        to: r.duda.id,
      }),
    },
  }),
);
