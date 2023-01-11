import { RecipeService } from './../recipes/recipe.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { Module } from "@nestjs/common";
import { AuthService } from "auth/auth.service";
import { UserController } from "./user.controller";
import {UserService} from './user.service'

@Module({
    providers: [UserService,AuthService,JwtService,JwtStrategy,RecipeService],
    exports: [UserService],
    controllers:[UserController]
})
export class UserModule{}