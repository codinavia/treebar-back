import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Drizzle } from './database.service.js';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [Drizzle],
  exports: [Drizzle],
})
export class DatabaseModule {}