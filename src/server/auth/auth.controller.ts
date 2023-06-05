import { LoginUserDto } from '../user/dto/login.dto';
import { RegisterUserDto } from '../user/dto/registration.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './session/local-auth.guard';
import { AuthenticatedGuard } from './session/authenticated.guard';
import { body } from 'express-validator';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @UsePipes(ValidationPipe)
  @Post('/registration')
  async addUser(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  // @Post('/login')
  // async login(@Body() dto: LoginUserDto, @Res() res) {
  //   const user = await this.userService.findUser(dto.username);
  //   if (!user) {
  //     res.code(400).send({ error: 'invalid user' });
  //     return res;
  //   }
  //
  //   const validateUser = await this.authService.validateUser(
  //     user.username,
  //     dto.password
  //   );
  //   if (validateUser === true) {
  //     return await this.authService.login(user);
  //   } else {
  //     res.code(400).send({ error: 'incorrect username or password' });
  //     return res;
  //   }
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Body() dto: LoginUserDto, @Request() req) {
  // login(@Request() req): any {
  // return {
  //   User: req.user,
  //   msg: 'User logged in',
  // };
  //   const user =  await this.userService.findUser(dto.username);
  //   return await this.authService.login(user);
  // }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }
  //Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

}
