import { Type } from 'class-transformer';
import { 
    IsLatitude, 
    IsLongitude, 
    IsOptional, 
} from 'class-validator';

export class LocationDto {
  @IsOptional() @Type(() => Number) @IsLatitude()
  latitud?: number;

  @IsOptional() @Type(() => Number) @IsLongitude()
  longitud?: number;
}