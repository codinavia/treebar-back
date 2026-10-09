import { ApiProperty } from '@nestjs/swagger';
import { ProductDetailsDto } from './product-details.dto.js';
import { RepairPlaceDto } from './repair-place.dto.js';
import { GetReviewsResponseDto } from '../../reviews/dto/get-reviews-response.dto.js';

export class ScanResponseDto {
  @ApiProperty({ 
    description: 'Detalles del producto proporcionado por Go-UPC',
    type: ProductDetailsDto, nullable: true 
  })
  producto: ProductDetailsDto | null;

  @ApiProperty({
    description: 'Lista de talleres de reparación cercanos proporcionado por Nearby Places API', 
    type: [RepairPlaceDto] 
  })
  reparaciones: RepairPlaceDto[];

  @ApiProperty({ 
    description: 'Lista de reseñas del producto',
    type: [GetReviewsResponseDto] 
  })
  reseñas: GetReviewsResponseDto[];
}