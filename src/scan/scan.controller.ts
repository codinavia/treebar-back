import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScanService } from './scan.service.js';
import { CreateScanDto } from './dto/create-scan.dto.js';
import { UpdateScanDto } from './dto/update-scan.dto.js';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post()
  create(@Body() createScanDto: CreateScanDto) {
    return this.scanService.create(createScanDto);
  }

  @Get()
  findAll() {
    return this.scanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScanDto: UpdateScanDto) {
    return this.scanService.update(+id, updateScanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scanService.remove(+id);
  }
}
