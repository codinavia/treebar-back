import { PartialType } from '@nestjs/mapped-types';
import { CreateRepairLocationDto } from './create-repair-location.dto.js';

export class UpdateRepairLocationDto extends PartialType(CreateRepairLocationDto) {}
