import { Injectable } from '@nestjs/common';
import { Drizzle } from '../database/database.service.js';
import { certificacion } from '../database/schema.js';
import { CertificationDto } from './dto/certification-dto.js';

@Injectable()
export class CertificationsService {
  constructor(
    private readonly drizzle: Drizzle
  ) {}

  async findAll():Promise<CertificationDto[]> {
    return this.drizzle.db
      .select({
        nombre: certificacion.nombre,
        url: certificacion.url,
        descripcion: certificacion.descripcion,
      })
      .from(certificacion);
  }
}
