import { IsOptional } from "class-validator";
import { PaginationDto } from "src/__shared__/dto/pagination.dto";
import { UserPosition } from "src/__shared__/enums/user-position.enum";
import { UserRole } from "src/__shared__/enums/user-role.enum";

export namespace FetchUserDto {
  export class Input extends PaginationDto {
    @IsOptional()
    role: UserRole = UserRole.ADMIN;

    @IsOptional()
    q?: string;
  }

  export class Output {
    names: string;
    email: string;
    position: UserPosition;
  }
}
