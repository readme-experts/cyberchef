import { UserService } from '../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/Entities/user.entity';
import { CreateUserDto } from './DTO/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.findUser(userDto.username);
    if (user && user.password === userDto.password) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
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
