import { IsNotEmpty, IsString } from "class-validator";

export class NotifyEmailDto{
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    subject: string

    @IsString()
    @IsNotEmpty()
    body: string

}