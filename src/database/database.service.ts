import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import { relations } from './schema.js';
import { sql } from 'drizzle-orm/sql/sql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Drizzle implements OnModuleInit, OnModuleDestroy {
  public db: MySql2Database<typeof relations>;
  private pool: mysql.Pool;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: this.config.getOrThrow<string>('DB_HOST'),
      port: this.config.getOrThrow<number>('DB_PORT'),
      user: this.config.getOrThrow<string>('DB_USER'),
      password: this.config.getOrThrow<string>('DB_PASSWORD'),
      database: this.config.getOrThrow<string>('DB_NAME'),
    });

  // console.log('pool.config:', this.pool.config);
  // console.log('pool.pool?.config:', (this.pool as any).pool?.config);
    
    this.db = drizzle({ client: this.pool, relations });
    await this.db.execute(sql`select 1`);  
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}