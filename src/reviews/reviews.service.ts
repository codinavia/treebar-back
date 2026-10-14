import { 
  Injectable, 
  ConflictException,
} from '@nestjs/common';
import { Drizzle } from '../database/database.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { CommentDto } from './dto/comment.dto.js';
import { GetReviewsResponseDto } from './dto/get-reviews-response.dto.js';
import { 
  reseña, 
  criterio_calificacion,
  criterio
} from '../database/schema.js';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly drizzle: Drizzle
  ) {}
  
  async create(createReviewDto: CreateReviewDto) {
    const { 
      huella_usuario, 
      codigo_producto, 
      comentarios } 
    = createReviewDto;

    if (await this.existsReviewByUser(huella_usuario, codigo_producto)) {
      throw new 
        ConflictException(`El usuario con huella ${huella_usuario} ya ha dejado una reseña para el producto ${codigo_producto}`);
    }

    return this.drizzle.db.transaction(async (tx) => {
      await tx
        .insert(reseña)
        .values({ huella_usuario, codigo_producto });

      await tx
        .insert(criterio_calificacion)
        .values(
          comentarios.map((c: CommentDto) => ({
            huella_usuario,
            codigo_producto,
            id_criterio: c.id_criterio,
            comentario: c.comentario,
            calificacion: c.calificacion,
          })),
      );
  });
}

  async findAllByTypeOfCriteria(
    codigo_producto: string,
    tipo: string
  ): Promise<GetReviewsResponseDto[]> {
    const result = await this.drizzle.db
      .query
      .criterio
      .findMany({
        columns: {
          pregunta: true,
        },
        where: { tipo },
        with: {
          calificaciones: {
            columns: {
              id_criterio: true,
              comentario: true,
              calificacion: true,
            },
            where: { codigo_producto },  
          },
        },
      });

    return result;
  }

  async findAllQuestions() {
    return await this.drizzle.db
      .select({
        pregunta: criterio.pregunta
      })
      .from(criterio);
  }

  async existsReviewByUser(
    huella_usuario: string,
    codigo_producto: string
  ): Promise<boolean> {
    const [review] = await await this.drizzle.db
      .query
      .criterio
      .findMany({
        with: {
          calificaciones: {
            where: { huella_usuario, codigo_producto },  
          },
        },
      });
    
    if (!review)
      return false;

    return true;
  }

  async findReviewByUser(
    huella_usuario: string,
    codigo_producto: string
  ): Promise<GetReviewsResponseDto[]> {
    
    return await this.drizzle.db
      .query
      .criterio
      .findMany({
        columns: {
          pregunta: true,
        },
        with: {
          calificaciones: {
            columns: {
              id_criterio: true,
              comentario: true,
              calificacion: true,
            },
            where: { huella_usuario, codigo_producto },  
          },
        },
      });
  }
}