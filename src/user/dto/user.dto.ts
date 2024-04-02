import { IsAscii, IsEmail, IsLowercase, IsNotEmpty, IsString, Matches} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @Matches(/^[a-z]+$/)
    username: string

    @IsNotEmpty()
    fullName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}