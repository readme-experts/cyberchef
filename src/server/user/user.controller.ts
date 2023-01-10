
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { PrismaService } from '.././prisma.service';
// import { users as UserModel, Prisma } from '@prisma/client';
// import { UserRepository } from '../../database/repositories/user';
import { CreateUserDto } from './dto/createUser.dto';

// const prisma = new PrismaService();
// const user = new UserRepository(prisma);

@Controller()
export class UserController {
  constructor( private userService : UserService) {}


  @Post('/registration')
  async addUser(@Body() dto: CreateUserDto) {
    console.log(dto);
    return this.userService.addUser(dto)
  }

  @Get('/users')
  async  findUser(@Body('username') username: string) {
    console.log(username);
    return this.userService.findUser(username)
  }
}
