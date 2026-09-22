import { Test, TestingModule } from '@nestjs/testing';
import { CertificationsController } from './certifications.controller.js';
import { CertificationsService } from './certifications.service.js';

describe('CertificationsController', () => {
  let controller: CertificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificationsController],
      providers: [CertificationsService],
    }).compile();

    controller = module.get<CertificationsController>(CertificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
