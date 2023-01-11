import { UserService } from './../user/user.service';
import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';


@Injectable() 
export class AuthService{
    constructor(private userService: UserService, private jwtService : JwtService) {}

    async validateUser(username : string, password: string): Promise<any> {
        const user = await this.userService.findUser(username)
        console.log(user);
        

        if(user && user.password === password ) {
            return user
        }
        return null 
    }

   async login(user: any) {
       const payload  = { username : user.username, id : user.id}
       return {
           access_token : this.jwtService.sign(payload)
       }
   }

    async hello() {
        return "hello"
    }

}