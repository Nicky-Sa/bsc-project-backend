import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { Role } from '@prisma/client';

export class AuthDto {
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
