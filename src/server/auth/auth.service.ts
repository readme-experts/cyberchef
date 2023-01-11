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

  async login(user) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

//   async getUserId(req)  {
//     const token = req.headers.authorization;
//     const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     return payload.id;
//   }

  async register(user) {
    const payload = { username: user.username, id: user.id };
    // console.log(payload, this.jwtService);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hello() {
    return 'hello';
  }
}
