import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { UserPosition } from "src/__shared__/enums/user-position.enum";

/** Sign up DTO */
export namespace SignupDto {
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
