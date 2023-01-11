import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { Module } from "@nestjs/common";
import {AuthService} from './auth.service'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UserModule, PassportModule , JwtModule.register({
        secret : 'SECRET',
        signOptions : {expiresIn: '60s'},
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports : [AuthService]
})
export class AuthModule{}
