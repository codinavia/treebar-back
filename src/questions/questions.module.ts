import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import { QuestionsController } from './questions.controller.js';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
