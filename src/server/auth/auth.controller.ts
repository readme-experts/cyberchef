import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async addUser(@Body() regData: CreateUserDto) {
    return await this.authService.register(regData);
  }

  @Post('/login')
  async login(@Body() userData: CreateUserDto) {
    const validatedUser = await this.authService.validateUser(userData);
    return this.authService.login(validatedUser);
  }
}
