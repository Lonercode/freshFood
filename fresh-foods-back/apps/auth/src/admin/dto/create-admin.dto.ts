import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateAdminDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    AdminPassword: string
    
}