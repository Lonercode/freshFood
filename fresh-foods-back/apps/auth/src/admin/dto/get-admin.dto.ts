import { IsString, IsNotEmpty } from "class-validator";

export class getAdminDto{
    @IsString()
    @IsNotEmpty()
    _id: string;
}