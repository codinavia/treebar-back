import { Module } from '@nestjs/common';
import { CertificationsService } from './certifications.service.js';
import { CertificationsController } from './certifications.controller.js';

@Module({
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
