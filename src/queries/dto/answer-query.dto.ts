import { ApiProperty } from '@nestjs/swagger';
import { 
    MaxLength,
    IsString, 
    IsNotEmpty,
    IsNumber
} from 'class-validator';

export class AnswerQueryDto {
    @ApiProperty({
        description: "Identificador de la duda a la que se responde"
    })
    @IsNumber()
    id_duda: number;
    
    @ApiProperty({
        description: "Respuesta a la duda"
    })
    @MaxLength(250)
    @IsString()
    @IsNotEmpty()
    respuesta: string;
}