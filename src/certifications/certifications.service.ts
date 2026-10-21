import { Injectable } from '@nestjs/common';

@Injectable()
export class CertificationsService {
  findAll() {
    return `This action returns all certifications`;
  }
}
