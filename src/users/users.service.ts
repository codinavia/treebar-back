import { 
  Injectable, 
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto.js';
import { eq } from 'drizzle-orm';
import { relations } from '../database/schema.js';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import { Drizzle } from '../database/database.service.js';
import { usuario } from '../database/schema.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(Drizzle) private readonly db: MySql2Database<typeof relations>
  ) {}

  async create(user: UserDto) {
    if (await this.findOne(user.huella)) {
      throw new 
        ConflictException(`Usuario con huella ${user.huella} ya existe`);
    }

    await this.db
      .insert(usuario)
      .values(user);
  }

  async findOne(id: string): Promise<UserDto> {
    const [user] = await this.db
      .select()
      .from(usuario)
      .where(eq(usuario.huella, id));
    
    if (!user) {
      throw new 
        NotFoundException(`Usuario con huella ${id} no encontrado`);
    }  

    return user;
  }
}
