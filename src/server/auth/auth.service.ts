import { UserService } from '../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    console.log(user);

    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user) {
    if (!user) {
      throw new BadRequestException('invalid user');
    }
    const payload = { username: user.username, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(regData) {
    const passwordHash = await bcrypt.hash(regData.password, 12);
    const userRegData = {
      email: regData.email,
      username: regData.username,
      passwordHash,
    };
    return await this.userService.addUser(userRegData);
  }
}
