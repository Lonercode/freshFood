import { IsEmail, IsIn } from "class-validator";

export enum Entity {
    USER = 'user',
    ADMIN = 'admin',
    VENDOR = 'vendor'
}

export enum OtpReason {
    ACCOUNT_VERIFICATION = 'account_verification',
    PASSWORD_RESET = 'password_reset'
}

export class RequestOtpDto {

    @IsEmail()
    email: string;

    @IsIn(Object.values(Entity))
    entity: string;

    @IsIn(Object.values(OtpReason))
    reason: string
}