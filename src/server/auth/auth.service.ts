<<<<<<< HEAD
// import { UserService } from './../user/user.service';
// import { Injectable } from "@nestjs/common";
// import { JwtService } from '@nestjs/jwt';


// @Injectable() 
// export class AuthService{
//     constructor(private userService: UserService, private jwtService : JwtService) {}

//     async validateUser(username : string, password: string): Promise<any> {
//         const user = await this.userService.findUser(username)
//         console.log(user);
        

//         if(user && user.password === password ) {
//             return user
//         }
//         return null 
//     }

//    async login(user: any) {
//        const payload  = { username : user.username, id : user.id}
//        return {
//            access_token : this.jwtService.sign(payload)
//        }
//    }

//     async hello() {
//         return "hello"
//     }

// }

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //   // //const user = await this.userService.findUser(username);
  //   // console.log(user);
  //   //
  //   // if (user && user.password === password) {
  //   //   return user;
  //   // }
  //   // return null;
  // }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };

    console.log(payload, this.jwtService);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const payload = { username: user.username, id: user.id };

    console.log(payload, this.jwtService);
=======
import { UserService } from '../user/user.service';
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
       const payload  = { username : user.username, id : user.id};

       console.log(payload, this.jwtService)

       return {
           access_token : this.jwtService.sign(payload)
       }
   }
>>>>>>> 907e035f4ed2f5346c399ad90b8b36f0bea07f66

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

<<<<<<< HEAD
  async hello() {
    return 'hello';
  }
=======
>>>>>>> 907e035f4ed2f5346c399ad90b8b36f0bea07f66
}
