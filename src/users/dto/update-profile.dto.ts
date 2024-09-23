import { IsString, IsEmail, IsOptional, IsEnum } from "class-validator";
import { UserPosition } from "src/__shared__/enums/user-position.enum";

export namespace UpdateProfileDto {
  export class Input {
    @IsString()
    @IsOptional()
    names?: string;

    @IsEmail({}, { message: "Invalid email address" })
    @IsOptional()
    email?: string;

    @IsEnum(UserPosition)
    @IsOptional()
    position?: UserPosition;
  }
  export class OutPut {
    id: number;
    names: string;
    email: string;
    position: UserPosition;
  }
}
