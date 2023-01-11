import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  addUser(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }
}
