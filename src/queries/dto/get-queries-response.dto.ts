import { ApiProperty } from '@nestjs/swagger';

export class RespuestaDto {
  @ApiProperty({ description: "Texto de la respuesta" })
  respuesta: string;
}

export class GetQueriesResponseDto {
  @ApiProperty({ description: "Pregunta relacionada al producto dado" })
  pregunta: string;

  @ApiProperty({ description: "Arreglo de respuestas a la pregunta realizada", type: [RespuestaDto] })
  respuestas: RespuestaDto[];
}