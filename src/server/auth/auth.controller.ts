import { CreateUserDto } from './../user/dto/createUser.dto';
import { CreateRecipeDto } from './../recipes/recipe.dto';
import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService : UserService) {}

  @Post('/registration')
  async addUser(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Post('/login')
  async login(@Body() userData) {
    const user = await this.userService.findUser(userData.username) 
    try{
        await this.authService.validateUser(user.username, user.password)
        return this.authService.login(user)
    }
    catch(e){
        console.error(e)
    }
}
}
