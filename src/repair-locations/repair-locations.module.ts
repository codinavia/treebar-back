import { Module } from '@nestjs/common';
import { RepairLocationsService } from './repair-locations.service.js';
import { RepairLocationsController } from './repair-locations.controller.js';

@Module({
  controllers: [RepairLocationsController],
  providers: [RepairLocationsService],
})
export class RepairLocationsModule {}
