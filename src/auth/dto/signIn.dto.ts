import { IsString, MaxLength, MinLength } from "class-validator";

export class SignInUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    account: string;

    @IsString()
    @MinLength(3)
    @MaxLength(25)
    password: string;
}