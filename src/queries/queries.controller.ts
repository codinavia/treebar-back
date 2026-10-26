import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete } from '@nestjs/common';
import { QueriesService } from './queries.service.js';
import { 
  ApiOperation, 
  ApiResponse,
  ApiTags
 } from '@nestjs/swagger';
import { CreateQueryDto } from './dto/create-query.dto.js';
import { AnswerQueryDto } from './dto/answer-query.dto.js';

@ApiTags('Dudas')
@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @ApiOperation({ summary: 'Crea una nueva duda de un producto' })
  @Post('dejar_duda')
  create(
    @Body() createQueryDto: CreateQueryDto
  ) {
    return this.queriesService.create(createQueryDto);
  }

  @Post('responder')
  answer(
    @Body() answerQueryDto: AnswerQueryDto
  ) {
    return this.queriesService.answer(answerQueryDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las dudas de un producto' })
  @Get(':codigo_producto')
  findAll(
    @Param('codigo_producto') codigo_producto: string
  ) {
    return this.queriesService.findAll(codigo_producto);
  }

  @ApiOperation({ summary: 'Obtiene las respuestas a una duda específica de un producto' })
  @Get(':codigo_producto/:pregunta')
  findQueryAnswers(
    @Param('codigo_producto') codigo_producto: string,
    @Param('pregunta') pregunta: string
  ) {
    return this.queriesService.findQueryAnswers(codigo_producto, pregunta);
  }
}