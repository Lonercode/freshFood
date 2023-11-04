import { IsString, IsNotEmpty } from "class-validator";

export class getUserDto{
    @IsString()
    @IsNotEmpty()
    _id: string;
}