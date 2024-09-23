import { IsString, IsNotEmpty, IsEmail, IsArray } from "class-validator";

export namespace UpdateCustomerDto {
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
  export class Output {
    names: string;
    email: string;
    phoneNumber: string;
    preferences: string[];
    feedBack: string;
    bookingHistory: string;
  }
}
