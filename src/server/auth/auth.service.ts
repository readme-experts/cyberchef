import { RegisterUserDto } from '../user/dto/registration.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../prisma/Entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private user: UserRepository) {}

  async validateUser(
    username: string,
    password: string,
    user: UserEntity
  ): Promise<boolean> {
    const passwordCheck = await bcrypt.compare(password, user.password);
    return user.username === username && passwordCheck === true;
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
  async register(dto: RegisterUserDto) {
    const checkUser = await this.user.find(dto.username);
    if (checkUser) {
      throw new BadRequestException('User with this email already exists');
    }
    dto.passwordHash = await bcrypt.hash(dto.password, 12);
    return await this.user.add(dto);
  }
}
