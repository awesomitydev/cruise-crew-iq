import { PartialType } from "@nestjs/swagger";
import { CreateJobApplicationDto } from "./create-job-application.dto";
import { JobStatus } from "src/__shared__/enums/job-status.enum";

export namespace UpdateJobApplicationDto {
  export class Input extends PartialType(CreateJobApplicationDto.Input) {}
  export class OutPut {
    name: string;
    email: string;
    phone: string;
    resume: string;
    coverLetter: string;
    nationalID: string;
    status: JobStatus;
  }
}
