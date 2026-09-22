import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { usuario, empresa, producto, reseña, criterio_calificacion, criterio, empresa_certificacion, certificacion } from "./db/schema.js";
  
const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
const db = drizzle({ client: poolConnection });