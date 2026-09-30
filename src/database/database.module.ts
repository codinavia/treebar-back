import { Global, Module } from '@nestjs/common';
import { Drizzle } from './database.service.js';

@Global()
@Module({
  providers: [Drizzle],
  exports: [Drizzle],
})
export class DatabaseModule {}