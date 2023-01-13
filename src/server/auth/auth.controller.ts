import { LoginUserDto } from '../user/dto/login.dto';
import { RegisterUserDto } from '../user/dto/registration.dto';
import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
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

  @Post('/login')
  async login(@Body() dto: LoginUserDto, @Res() res) {
    const user = await this.userService.findUser(dto.username);
    const validateUser = await this.authService.validateUser(
      user.username,
      dto.password,
      user
    );
    if (validateUser === true) {
      return this.authService.login(user);
    } else {
      return res
        .status(400)
        .json({ message: 'incorrect username or password' });
    }
  }
}
