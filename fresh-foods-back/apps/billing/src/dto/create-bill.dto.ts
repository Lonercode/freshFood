import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class createBillDto{
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsEmail()
    email: string

}