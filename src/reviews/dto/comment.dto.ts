import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty,
    IsNumber,
    MaxLength
} from 'class-validator';

export class CommentDto {
    @ApiProperty({
        description: 'Identificador del criterio evaluado',
        example: 'USO01'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    id_criterio: string;

    @ApiProperty({
        description: 'Comentario del usuario sobre el producto en base al criterio evaluado',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    comentario: string;
}
