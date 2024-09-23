import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace CreateCustomerDto {
  export class Input {
    @IsString()
    @IsNotEmpty()
    names: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsArray()
    @IsNotEmpty()
    preferences: string[];

    @IsString()
    @IsNotEmpty()
    feedBack: string;

    @IsString()
    @IsNotEmpty()
    bookingHistory: string;
  }
}
