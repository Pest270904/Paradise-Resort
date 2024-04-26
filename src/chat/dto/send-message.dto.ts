import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}
