import { UserService } from '../user/user.service';
import { JwtStrategy } from './JWT/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { SessionSerializer } from './session/session.serializer';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    UserRepository,
    PrismaService,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
