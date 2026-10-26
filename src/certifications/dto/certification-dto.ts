import { ApiProperty } from '@nestjs/swagger';

export class CertificationDto {
  @ApiProperty({
    description: 'Nombre de la certificación',
    example: 'EPEAT',
  })
  nombre: string;

  @ApiProperty({
    description: 'URL de la certificación',
    example: 'https://www.epeat.net/product-finder',
  })
  url: string;

  @ApiProperty({
    description: 'Descripción de la certificación',
    example: 'Es una etiqueta ecológica de confianza a nivel mundial que ofrece un impacto medible y facilita a las organizaciones la compra de productos electrónicos que son mejores para las personas, el planeta y la rentabilidad.',
  })
  descripcion: string;
}
