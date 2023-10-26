import { IsString, IsNumber, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class createOrdersDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string


}