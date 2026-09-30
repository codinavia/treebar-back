import { ApiProperty } from '@nestjs/swagger';
import { 
    IsArray,
    IsNotEmpty, 
    IsString, 
} from 'class-validator';
import { CommentDto } from './comment.dto.js';

export class CreateReviewDto {
    @ApiProperty({
        description: 'Huella digital del dispositivo del usuario'
    })
    @IsString()
    @IsNotEmpty()
    huella_usuario: string;

    @ApiProperty({
        description: 'Código del producto al que se le está haciendo la reseña'
    })
    @IsString()
    @IsNotEmpty()
    codigo_producto: string;

    @ApiProperty({
        description: 'Arreglo de criterios, comentarios, calificaciones del producto'
    })
    @IsArray()
    @IsNotEmpty()
    comentarios: CommentDto[];
}