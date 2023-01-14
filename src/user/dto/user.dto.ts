import { IsNumberString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber?: string;

  @IsOptional()
  fullName?: string;
}
