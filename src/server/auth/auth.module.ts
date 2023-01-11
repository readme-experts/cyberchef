import { PrismaService } from './../prisma.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from './../user/user.module';
import { Module } from "@nestjs/common";
import {AuthService} from './auth.service'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

// @Module({
//     imports: [UserModule, PassportModule , JwtModule.register({
//         secret : 'SECRET',
//         signOptions : {expiresIn: '60s'},
//     })],
//     providers: [AuthService, LocalStrategy, JwtStrategy], 
//     exports : [AuthService]
// })
// export class AuthModule{}

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: 'SECRET',
        signOptions: { expiresIn: '60s' },
      }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
  })
  export class AuthModule {}
  