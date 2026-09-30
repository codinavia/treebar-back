import { 
  Controller, 
  Get, 
  Post,
  Body, 
  Patch, 
  Param, 
  Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UserDto } from './dto/user.dto.js';
import { 
  ApiTags,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  @Post()
  create(
    @Body() createUserDto: UserDto
  ) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtiene un usuario por su huella digital' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserDto,
  })
  @Get(':userId')
  findOne(
    @Param('userId') id: string
  ) {
    return this.usersService.findOne(id);
  }
}
