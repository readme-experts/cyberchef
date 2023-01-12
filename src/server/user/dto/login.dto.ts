import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Length(6, 15)
  username: string;
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Length(6, 15)
  password: string;
}
