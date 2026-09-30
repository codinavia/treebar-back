import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { 
  ApiOperation, 
  ApiResponse,
  ApiTags
 } from '@nestjs/swagger';
import { GetReviewsResponseDto } from './dto/get-reviews-response.dto.js';
import { CreateReviewDto } from './dto/create-review.dto.js';

@ApiTags('Reseñas')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Crea una nueva reseña de un producto' })
  @Post('dejar_reseña')
  create(
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewsService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las calificaciones y comentarios de un producto por tipo de criterio evaluado' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas con sus comentarios y calificaciones',
    type: [GetReviewsResponseDto], 
  })
  @Get(':codigo_producto/:tipo')
  findAllByTypeOfCriteria(
    @Param('codigo_producto') codigo_producto: string,
    @Param('tipo') tipo: string
  ) {
    return this.reviewsService.findAllByTypeOfCriteria(codigo_producto, tipo);
  }

  @ApiOperation({ summary: 'Obtiene todas las preguntas de los criterios evaluados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas',
    type: [String],
  })
  @Get('preguntas')
  findAllQuestions() {
    return this.reviewsService.findAllQuestions();
  }

  @ApiOperation({ summary: 'Obtiene la reseña de un usuario para un producto específico' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas con los comentarios y calificaciones del usuario',
    type: [GetReviewsResponseDto],
  })
  @Get(':huella_usuario/:codigo_producto')
  findReviewByUser(
    @Param('huella_usuario') huella_usuario: string,
    @Param('codigo_producto') codigo_producto: string
  ) {
    return this.reviewsService.findReviewByUser(huella_usuario, codigo_producto);
  }
}
