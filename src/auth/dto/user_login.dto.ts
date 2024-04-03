import {IsNotEmpty, IsString } from "class-validator"

export class LoginUserDto {
    @IsNotEmpty()
    username: string
    
    @IsNotEmpty()
    @IsString()
    password: string
}