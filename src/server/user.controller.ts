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
import { PrismaService } from './prisma.service';
import { users as UserModel, Prisma } from '@prisma/client';
import { UserRepository } from '../database/repositories/user.js';

const prisma = new PrismaService();
const user = new UserRepository(prisma);

@Controller()
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    // just for the test
    const userdata = await user.find('user');
    return userdata
  }
}
