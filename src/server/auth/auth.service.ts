import { UserService } from './../user/user.service';
import { Injectable } from "@nestjs/common";
import { StringLiteralType } from 'typescript';

@Injectable() 
export class AuthService{
    constructor(private userService: UserService) {}

    async validateUser(username : string, password: string): Promise<any> {
        const user = await this.userService.findUser(username)

        if(user && user.password === password ) {
            return user
        }

    }
}