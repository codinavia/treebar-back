import { ProductDetailsDto } from './product-details.dto.js';
import { RepairPlaceDto } from './repair-place.dto.js';

export class CachedDto {
    producto: ProductDetailsDto | null;
    reparaciones: RepairPlaceDto[];
}