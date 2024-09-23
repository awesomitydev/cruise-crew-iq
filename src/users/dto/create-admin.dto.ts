import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { UserPosition } from "src/__shared__/enums/user-position.enum";

export namespace CreateAdminDTO {
  export class Input {
    @IsString()
    @IsNotEmpty()
    names: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(UserPosition)
    @IsNotEmpty()
    position: UserPosition;

    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    password: string;
  }
}
