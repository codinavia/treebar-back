import { 
  Injectable, 
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto.js';
import { eq } from 'drizzle-orm';
import { Drizzle } from '../database/database.service.js';
import { usuario } from '../database/schema.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly drizzle: Drizzle
  ) {}

  async create(user: UserDto) {
    if (await this.exists(user.huella)) {
      throw new 
        ConflictException(`Usuario con huella ${user.huella} ya existe`);
    }

    await this.drizzle.db
      .insert(usuario)
      .values(user);
  }

  async exists(id: string): Promise<boolean> {
    const [user] = await this.drizzle.db
      .select()
      .from(usuario)
      .where(eq(usuario.huella, id));
    
    if (!user)
      return false;

    return true;
  }

  async findOne(id: string): Promise<UserDto> {
    const [user] = await this.drizzle.db
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
