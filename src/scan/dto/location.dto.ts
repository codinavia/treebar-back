import { ApiProperty } from '@nestjs/swagger';
import { 
    IsLatitude, 
    IsLongitude, 
    IsNotEmpty 
} from 'class-validator';

export class LocationDto {
    @ApiProperty({
        description: 'Latitud de la ubicación',
        example: 40.7128,
    })
    @IsLatitude()
    @IsNotEmpty()
    latitud: number;

    @ApiProperty({
        description: 'Longitud de la ubicación',
        example: -74.0060,
    })
    @IsLongitude()
    @IsNotEmpty()
    longitud: number;
}