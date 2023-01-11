import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
<<<<<<< HEAD
import { UserModule } from './../user/user.module';
=======
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
>>>>>>> 907e035f4ed2f5346c399ad90b8b36f0bea07f66
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
<<<<<<< HEAD
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
  
=======
    imports: [UserModule, PassportModule , JwtModule.register({
        secret : 'SECRET',
        signOptions : {expiresIn: '60s'},
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports : [AuthService]
})
export class AuthModule{}
>>>>>>> 907e035f4ed2f5346c399ad90b8b36f0bea07f66
