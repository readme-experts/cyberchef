import { UserService } from '../user/user.service';
import { JwtStrategy } from './JWT/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3660s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
