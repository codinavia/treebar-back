import { Test, TestingModule } from '@nestjs/testing';
import { RepairLocationsController } from './repair-locations.controller.js';
import { RepairLocationsService } from './repair-locations.service.js';

describe('RepairLocationsController', () => {
  let controller: RepairLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairLocationsController],
      providers: [RepairLocationsService],
    }).compile();

    controller = module.get<RepairLocationsController>(RepairLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
