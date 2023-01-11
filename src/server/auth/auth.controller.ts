
import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService : UserService) {}

  @Post('/registration')
  async addUser(@Body() regData) {
    return await this.authService.register(regData);
  }

  @Post('/login')
  async login(@Body() userData) {
    const user = await this.userService.findUser(userData.username) 
        await this.authService.validateUser(user.username, user.password)
        return this.authService.login(user)
}
}
