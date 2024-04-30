import { IsAscii, IsEmail, IsLowercase, IsNotEmpty, IsString, Matches} from "class-validator"

export class CreateUserDto {
    // @IsNotEmpty()
    // @Matches(/^(?!^\d)(?!.*\d{2})[a-z0-9]+$/, {
    //     message: "Username can only contain lowercase letters from 'a' to 'z' and numbers, but not at the start."
    // })
    username: string

    // @IsNotEmpty()
    fullName: string

    // @IsNotEmpty()
    // @IsEmail()
    email: string

    phoneNumber: string

    // @IsNotEmpty()
    // @IsString()
    password: string

    password_confirmation: string
}