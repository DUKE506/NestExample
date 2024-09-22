import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    account: string;

    @IsString()
    @MinLength(3)
    @MaxLength(25)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}
