import { 
  Injectable, 
  Inject
} from '@nestjs/common';
import { relations } from '../database/schema.js';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import { Drizzle } from '../database/database.service.js';

@Injectable()
export class QueriesService {
  constructor(
    @Inject(Drizzle) private readonly db: MySql2Database<typeof relations>
  ) {}
}