import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() userDTO: UserDTO, @Res() res: Response) {
    await this.usersService.save(userDTO);
    return res.sendStatus(HttpStatus.CREATED);
  }
}
