import { ApiProperty } from '@nestjs/swagger';

export class RepairPlaceDto {
  @ApiProperty({ description: 'Nombre del taller de reparación' })
  nombre: string;

  @ApiProperty({ description: 'Distancia en metros' })
  distanciaMetros?: number;
}