import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "src/__shared__/enums/task-status.enum";
import { UserPosition } from "src/__shared__/enums/user-position.enum";

export namespace CreateTaskDto {
  export class Input {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;

    @IsEnum(UserPosition)
    @IsNotEmpty()
    position: UserPosition;

    @IsString()
    @IsNotEmpty()
    taskStartDate: Date;

    @IsString()
    @IsNotEmpty()
    taskEndDate: Date;
  }

  export class Output {
    id: number;
    description: string;
    status: TaskStatus;
    position: UserPosition;
    taskStartDate: Date;
    taskEndDate: Date;
  }
}
