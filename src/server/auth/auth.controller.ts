import { PrismaService } from './../prisma.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '../../database/repositories/user';

const prisma = new PrismaService()
const prismaUser = new UserRepository(prisma)

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async addUser(@Body() regData) {
    return await this.authService.register(regData);
  }

  @Post('/login')
  async login(@Body() userData) {
    const user = await prismaUser.find(userData.username) 
    const validateUser =  await this.authService.validateUser(userData.username, userData.password,user)
    if(validateUser === true) {
        return this.authService.login(user)
    }
    else{
        return 'incorrect username or password'
    }
}
}
