import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpadateUserDto{
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}