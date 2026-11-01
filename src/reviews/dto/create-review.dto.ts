import { ApiProperty } from '@nestjs/swagger';
import { 
    IsArray,
    IsNotEmpty, 
    IsString, 
    MaxLength
} from 'class-validator';
import { CommentDto } from './comment.dto.js';

export class CreateReviewDto {
    @ApiProperty({
        description: 'Huella digital del dispositivo del usuario'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    huella_usuario: string;

    @ApiProperty({
        description: 'Código del producto al que se le está haciendo la reseña'
    })
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    codigo_producto: string;

    @ApiProperty({
        description: 'Arreglo de criterios, comentarios, calificaciones del producto'
    })
    @IsArray()
    @IsNotEmpty()
    comentarios: CommentDto[];
}