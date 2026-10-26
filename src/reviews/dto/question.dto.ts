import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
    @ApiProperty({ description: 'Identificador único de la pregunta' })
    id: string;

    @ApiProperty({ description: 'Tipo de la pregunta' })
    tipo: string;

    @ApiProperty({ description: 'Texto de la pregunta' })
    pregunta: string;
}