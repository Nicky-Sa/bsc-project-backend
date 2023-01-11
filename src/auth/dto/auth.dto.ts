import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { Role } from '@prisma/client';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  fullName?: string;

  @IsEmpty()
  role?: Role;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
