import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService : UserService) {}

  @Post('/registration')
  addUser(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('/login')
  async login(@Body() userData) {
    const user = await this.userService.findUser(userData.username) 
    return this.authService.login(user);
  }
  
}
