import { IsOptional } from "class-validator";
import { PaginationDto } from "src/__shared__/dto/pagination.dto";
import { JobStatus } from "src/__shared__/enums/job-status.enum";

export namespace FetchJobApplicationDto {
  export class Input extends PaginationDto {
    @IsOptional()
    q?: string;
  }

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
