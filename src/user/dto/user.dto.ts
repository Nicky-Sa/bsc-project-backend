import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserInfoDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;
}
