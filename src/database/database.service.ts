import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { relations } from './schema.js';

@Injectable()
export class Drizzle implements OnModuleInit, OnModuleDestroy {
    public db: MySql2Database<typeof relations>;
    private pool: mysql.Pool;

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    });
    
    this.db = drizzle({ client: this.pool, relations });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}