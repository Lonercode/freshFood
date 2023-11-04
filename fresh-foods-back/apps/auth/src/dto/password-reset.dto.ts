import { IsEmail, IsIn, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export enum Entity {
    ADMIN = 'admin',
    BUYER = 'buyer',
    SELLER = 'seller'
};

export class resetPasswordDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsIn(Object.values(Entity))
    entity: string;

    @IsNotEmpty()
    @IsString()
    otp: string;

    @IsStrongPassword()
    newPassword: string;
}