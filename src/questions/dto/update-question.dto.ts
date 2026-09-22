import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto.js';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
