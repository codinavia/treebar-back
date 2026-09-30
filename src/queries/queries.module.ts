import { Module } from '@nestjs/common';
import { QueriesService } from './queries.service.js';
import { QueriesController } from './queries.controller.js';

@Module({
  controllers: [QueriesController],
  providers: [QueriesService],
})
export class QueriesModule {}
