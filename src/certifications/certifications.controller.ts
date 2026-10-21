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

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}
  
  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }
}
