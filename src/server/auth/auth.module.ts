import { UserService } from '../user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { SessionSerializer } from './session/session.serializer';
import { LocalStrategy } from './session/local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    UserRepository,
    PrismaService,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
