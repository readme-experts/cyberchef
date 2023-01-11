
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

  @Post('/registration')
  addUser(@Body() dto: CreateUserDto) {
    return this.userService.addUser(dto)
  }


  // @UseGuards(LocalAuthGuard)
  @Post('/login')
    login(@Body('username') username: string) {
    const user = this.userService.findUser(username)
    const token = this.authService.login(user)
    return token
  }

  // @Post('/login')
  // async login(@Body() user) {
  //   return this.authService.login(user);
  // }

  // @UseGuards(JwtAuthGuard)
  @Get('/hello')
  sayHello() {
    return this.authService.hello()
  }
  @Post('/user/recipes')
   addFavRecipe(@Body() recipeData) {
    return this.userService.addRecipe(recipeData)
  }
}
