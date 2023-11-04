import {IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export enum Entity{
    ADMIN = 'admin',
    BUYER = 'buyer',
    SELLER = 'seller'
}

export class VerifyAccountDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsIn(Object.values(Entity))
    entity: string;

    @IsNotEmpty()
    @IsString()
    otp: string;
}