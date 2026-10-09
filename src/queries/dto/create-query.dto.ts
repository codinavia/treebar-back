import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, 
    IsString, 
    MaxLength
} from 'class-validator';

export class CreateQueryDto {
    @ApiProperty({
        description: "Código del prodcto sobre el cuál se tiene la duda"
    })
    @IsNotEmpty()
    @IsString()
    codigo_producto: string;
    
    @ApiProperty({
        description: "Pregunta realizada por el usuario"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    pregunta: string;
}