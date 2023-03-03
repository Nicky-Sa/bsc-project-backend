import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: 'نام کاربری ضروری است.' })
  username: string;

  @IsNotEmpty({ message: 'رمز ورود ضروری است.' })
  password: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  fullName?: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
