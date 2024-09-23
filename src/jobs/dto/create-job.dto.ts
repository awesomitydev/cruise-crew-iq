import { IsDate, IsNotEmpty, IsString } from "class-validator";

export namespace CreateJobDto {
  export class Input {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;
  }
}
