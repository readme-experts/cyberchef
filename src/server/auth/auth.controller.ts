import { LoginUserDto } from './../user/dto/login.dto';
import { RegisterUserDto } from './../user/dto/registration.dto';
import { PrismaService } from './../prisma.service';
import { Body, Controller, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '../../database/repositories/user';

const prisma = new PrismaService()
const prismaUser = new UserRepository(prisma)

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/registration')
  async addUser(@Body() dto : RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @Post('/login')
  async login(@Body() dto : LoginUserDto, @Res() res) {
    const user = await prismaUser.find(dto.username) 
    const validateUser =  await this.authService.validateUser(user.username, dto.password,user)
    if(validateUser === true) {
        return this.authService.login(user)
    }
    else{
      return res.
      status(400)
      .json({message: 'incorrect username or password'})
    }
}
}
