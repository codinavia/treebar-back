import { 
  Injectable, 
  Inject
} from '@nestjs/common';
import { relations } from '../database/schema.js';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import { Drizzle } from '../database/database.service.js';
import { CreateQueryDto } from './dto/create-query.dto.js';
import { GetQueriesResponseDto } from './dto/get-queries-response.dto.js';
import { duda } from '../database/schema.js'; 

@Injectable()
export class QueriesService {
  constructor(
    @Inject(Drizzle) private readonly db: MySql2Database<typeof relations>
  ) {}

  async create(CreateQueryDto: CreateQueryDto) {
    await this.db
      .insert(duda)
      .values(CreateQueryDto);
  }

  async findAll(codigo_producto: string): Promise<GetQueriesResponseDto[]> {
    return await this.db
      .query
      .duda
      .findMany({
        columns: {
          pregunta: true
        },
        where: { codigo_producto },
        with: {
          respuestas: {
            columns: {
              respuesta: true
            }
          }
        }
      });
  }

  async findQueryAnswers(
    codigo_producto: string, 
    pregunta: string
  ): Promise<GetQueriesResponseDto> {
    const [result] = await this.db
      .query
      .duda
      .findMany({
        columns: {
          pregunta: true
        },
        where: { codigo_producto, pregunta },
        with: {
          respuestas: {
            columns: {
              respuesta: true
            }
          }
        }
      });

    return result;
  }
}