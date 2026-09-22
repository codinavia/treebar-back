import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificationDto } from './create-certification.dto.js';

export class UpdateCertificationDto extends PartialType(CreateCertificationDto) {}
