import { RegisterUserDto } from '../user/dto/registration.dto';
import { PrismaService } from '../prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../database/repositories/user';
import { UserEntity } from '../user/Entities/user.entity';

const prisma = new PrismaService();
const prismaUser = new UserRepository(prisma);

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(
    username: string,
    password: string,
    user: UserEntity
  ): Promise<string | boolean> {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (user.username === username && passwordCheck === true) {
      return true;
    }
    return 'incorrect data';
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
    dto.passwordhash = await bcrypt.hash(dto.password, 12);
    return await prismaUser.add(dto);
  }
}
