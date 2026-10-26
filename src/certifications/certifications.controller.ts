import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { CertificationsService } from './certifications.service.js';
import { 
  ApiOperation,
  ApiTags
 } from '@nestjs/swagger';

@ApiTags('Certificaciones')
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @ApiOperation({ summary: 'Obtiene todas las certificaciones' })
  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }
}
