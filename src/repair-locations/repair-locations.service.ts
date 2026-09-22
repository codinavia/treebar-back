import { Injectable } from '@nestjs/common';
import { CreateRepairLocationDto } from './dto/create-repair-location.dto.js';
import { UpdateRepairLocationDto } from './dto/update-repair-location.dto.js';

@Injectable()
export class RepairLocationsService {
  create(createRepairLocationDto: CreateRepairLocationDto) {
    return 'This action adds a new repairLocation';
  }

  findAll() {
    return `This action returns all repairLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repairLocation`;
  }

  update(id: number, updateRepairLocationDto: UpdateRepairLocationDto) {
    return `This action updates a #${id} repairLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} repairLocation`;
  }
}
