import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsNotEmpty
} from 'class-validator';

export class UserDto {
    @ApiProperty({ 
        description: 'Huella digital del dispositivo del usuario' 
    })
    @IsString()
    @IsNotEmpty()
    huella: string;
}