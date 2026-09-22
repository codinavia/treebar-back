import { Injectable } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto.js';
import { UpdateCertificationDto } from './dto/update-certification.dto.js';

@Injectable()
export class CertificationsService {
  create(createCertificationDto: CreateCertificationDto) {
    return 'This action adds a new certification';
  }

  findAll() {
    return `This action returns all certifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certification`;
  }

  update(id: number, updateCertificationDto: UpdateCertificationDto) {
    return `This action updates a #${id} certification`;
  }

  remove(id: number) {
    return `This action removes a #${id} certification`;
  }
}
