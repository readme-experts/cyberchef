import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
    email: string;

  @IsNotEmpty({ message: 'Username should not be empty' })
  @Length(6, 15)
    username: string;

  @IsNotEmpty()
  @Length(6, 15)
    password: string;
  passwordHash: string;
}
