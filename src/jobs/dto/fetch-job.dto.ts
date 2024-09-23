import { IsOptional } from "class-validator";
import { PaginationDto } from "src/__shared__/dto/pagination.dto";
export namespace FetchJobDto {
  export class Input extends PaginationDto {
    @IsOptional()
    q?: string;
  }

  export class OutPut {
    title: string;
    description: string;
    deaLine: Date;
  }
}
