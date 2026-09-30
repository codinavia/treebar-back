import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty,
    IsNumber,
    IsOptional,
    MaxLength
} from 'class-validator';

export class CommentDto {
    // @ApiPropertyOptional({
    //     description: 'Código del producto al que se le está haciendo la reseña',
    // })
    // @IsString()
    // @IsOptional()
    // codigo_producto?: string;

    // @ApiPropertyOptional({
    //     description: 'Huella digital del usuario',
    // })
    // @IsString()
    // @IsOptional()
    // huella_digital?: string;

    @ApiProperty({
        description: 'Identificador del criterio evaluado',
        example: 'USO01'
    })
    @IsString()
    @IsNotEmpty()
    id_criterio: string;

    @ApiProperty({
        description: 'Comentario del usuario sobre el producto en base al criterio evaluado',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    comentario: string;

    @ApiProperty({
        description: 'Calificación en una escala del 1 al 5 del producto en base al criterio evaluado',
    })
    @IsNumber()
    @IsNotEmpty()
    calificacion: number;
}
