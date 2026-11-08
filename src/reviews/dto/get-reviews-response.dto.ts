import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto.js';

export class GetReviewsResponseDto {
    @ApiProperty({ description: 'Pregunta del tipo de criterio evaluado' })
    pregunta: string;

    @ApiProperty({
        description: 'Arreglo de comentarios  del producto',
        type: [CommentDto],
    })
    calificaciones: CommentDto[];
}