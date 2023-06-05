import { RegisterUserDto } from '../user/dto/registration.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../prisma/Entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../user/user.service';
import { session } from 'passport';

@Injectable()
export class AuthService {
  constructor(private user: UserRepository, private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userService.findUser(username);
    const passwordCheck = await bcrypt.compare(password, user.password);
    return user.username === username && passwordCheck === true;
  }
  async login(user: UserEntity) {
    if (!user) {
      throw new BadRequestException('invalid user');
    }
    const payload = { username: user.username, id: user.id };
    return {
      payload,
    };
  }
  async register(dto: RegisterUserDto) {
    const checkUser = await this.user.find(dto.username);
    if (checkUser) {
      throw new BadRequestException('User with this email already exists');
    }
    dto.passwordHash = await bcrypt.hash(dto.password, 12);
    await this.user.add(dto);
    const newUser = await this.user.find(dto.username);
    return await this.login(newUser);
  }
}
