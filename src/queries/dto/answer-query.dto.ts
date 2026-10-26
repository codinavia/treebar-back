import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class AnswerQueryDto {
    @ApiProperty({
        description: "ID de la duda a la que se responde"
    })
    id_duda: number;
    
    @ApiProperty({
        description: "Respuesta a la duda"
    })
    @MaxLength(250)
    respuesta: string;
}