import { PartialType } from '@nestjs/mapped-types';
import { CreateScanDto } from './create-scan.dto.js';

export class UpdateScanDto extends PartialType(CreateScanDto) {}
