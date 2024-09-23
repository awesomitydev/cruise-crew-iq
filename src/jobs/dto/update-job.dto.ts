import { PartialType } from "@nestjs/swagger";
import { CreateJobDto } from "./create-job.dto";

export namespace UpdateJobDto {
  export class Input extends PartialType(CreateJobDto.Input) {}
  export class OutPut {
    title: string;
    description: string;
    deaLine: Date;
  }
}
