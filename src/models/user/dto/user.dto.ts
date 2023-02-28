import { IsNumberString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNumberString()
  phoneNumber?: string;

  @IsOptional()
  fullName?: string;
}
