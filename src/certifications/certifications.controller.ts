import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificationsService } from './certifications.service.js';
import { CreateCertificationDto } from './dto/create-certification.dto.js';
import { UpdateCertificationDto } from './dto/update-certification.dto.js';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  create(@Body() createCertificationDto: CreateCertificationDto) {
    return this.certificationsService.create(createCertificationDto);
  }

  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
    return this.certificationsService.update(+id, updateCertificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationsService.remove(+id);
  }
}
