import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairLocationsService } from './repair-locations.service.js';
import { CreateRepairLocationDto } from './dto/create-repair-location.dto.js';
import { UpdateRepairLocationDto } from './dto/update-repair-location.dto.js';

@Controller('repair-locations')
export class RepairLocationsController {
  constructor(private readonly repairLocationsService: RepairLocationsService) {}

  @Post()
  create(@Body() createRepairLocationDto: CreateRepairLocationDto) {
    return this.repairLocationsService.create(createRepairLocationDto);
  }

  @Get()
  findAll() {
    return this.repairLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairLocationDto: UpdateRepairLocationDto) {
    return this.repairLocationsService.update(+id, updateRepairLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairLocationsService.remove(+id);
  }
}
