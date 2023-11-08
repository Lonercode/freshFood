import { IsString } from "class-validator";

export class WelcomeDto{
    @IsString()
    email: string
}