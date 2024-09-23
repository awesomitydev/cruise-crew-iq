import { IsOptional } from "class-validator";
import { PaginationDto } from "src/__shared__/dto/pagination.dto";
import { TaskStatus } from "src/__shared__/enums/task-status.enum";
import { UserPosition } from "src/__shared__/enums/user-position.enum";

export namespace FetchTaskDto {
  export class Input extends PaginationDto {
    @IsOptional()
    q?: string;
  }

  export class Output {
    description: string;
    status: TaskStatus;
    position: UserPosition;
    taskStartDate: Date;
    taskEndDate: Date;
  }
}
