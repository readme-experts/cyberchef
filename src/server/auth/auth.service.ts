import { CreateUserDto } from './../user/dto/createUser.dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    console.log(user);
    
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user) {
      const payload = { username: user.username, id: user.id };
      return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(dto : CreateUserDto) {
    const user = await  this.userService.addUser(dto)
    return user
  }
}
