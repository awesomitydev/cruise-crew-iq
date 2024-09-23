import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { JobStatus } from "src/__shared__/enums/job-status.enum";

export namespace CreateJobApplicationDto {
  export class Input {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    resume: string;

    @IsString()
    @IsNotEmpty()
    coverLetter: string;

    @IsString()
    @IsNotEmpty()
    nationalID: string;

    @IsEnum(JobStatus)
    @IsNotEmpty()
    status: JobStatus;
  }
}
