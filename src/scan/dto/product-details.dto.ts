import { 
    ApiProperty, 
    ApiPropertyOptional 
} from '@nestjs/swagger';

export class ProductDetailsDto {
  @ApiProperty({
    description: 'Nombre del producto escaneado',
  }) 
  nombre: string;
  
  @ApiPropertyOptional({
    description: 'Marca del producto escaneado',
    example: 'On The Border',
  }) 
  marca?: string;
  
  @ApiPropertyOptional({
    description: 'Descripción del producto',
    example: 'New On The Border Jalapeno Queso is made with Real Cheese, Diced Jalapenos, Green Chiles, and Tomatoes for a kick of heat to spice up your queso craving. Enjoy hot or cold with your favorite On The Border tortilla chips, on enchiladas, or to spice up your side dish.',
  }) 
  descripcion?: string;
  
  @ApiPropertyOptional({
    description: 'URL de la imagen del producto',
    example: 'https://go-upc.s3.amazonaws.com/images/99132458.jpeg'
  }) 
  imagenUrl?: string;
  
  @ApiPropertyOptional() 
  categoria?: string;
  
  @ApiPropertyOptional({ 
    type: 'object', 
    additionalProperties: { type: 'string' },
    example: {
      "specs" : [
        [ "Organic", "No" ],
        [ "Non-GMO", "No" ],
        [ "Height", "4.88 In" ],
        [ "Width", "4.0 In" ],
        [ "Length", "4.0 In" ]
        ]
    }
  })
  especificaciones?: Record<string, string>;
  
  @ApiProperty({ description: 'true si Go-UPC dedujo los datos' }) 
  inferido: boolean;
}
