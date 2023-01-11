
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
// import { PrismaService } from '.././prisma.service';
// import { users as UserModel, Prisma } from '@prisma/client';
// import { UserRepository } from '../../database/repositories/user';
import { CreateUserDto } from './dto/createUser.dto';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
// const prisma = new PrismaService();
// const user = new UserRepository(prisma);

@Controller()
export class UserController {
  constructor( private userService : UserService, private  authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
}
