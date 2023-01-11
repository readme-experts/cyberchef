import { JwtService } from '@nestjs/jwt';
import { Module } from "@nestjs/common";
import { AuthService } from "auth/auth.service";
import { UserController } from "./user.controller";
import {UserService} from './user.service'

@Module({
    providers: [UserService,AuthService,JwtService],
    exports: [UserService],
    controllers:[UserController]
})
export class UserModule{}