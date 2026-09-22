import { Test, TestingModule } from '@nestjs/testing';
import { RepairLocationsService } from './repair-locations.service.js';

describe('RepairLocationsService', () => {
  let service: RepairLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairLocationsService],
    }).compile();

    service = module.get<RepairLocationsService>(RepairLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
