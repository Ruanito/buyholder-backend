import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
