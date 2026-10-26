import { 
  Controller, 
  Get, 
  Param,
  Query 
} from '@nestjs/common';
import { 
  ApiTags,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
import { ScanService } from './scan.service.js';
import { LocationDto } from './dto/location.dto.js';
import { ScanResponseDto } from './dto/scan-response.dto.js';

@ApiTags('Escaner')
@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Get(':barcode')
  @ApiOperation({ summary: 'Escanea un producto y devuelve información sobre él' })
  aggregate(
    @Param('barcode') barcode: string,
    @Query() ubicacion: LocationDto,
  ) {
    return this.scanService.aggregate(barcode, ubicacion);
  }
}