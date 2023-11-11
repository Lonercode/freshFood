import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { AdminService } from "../admin/admin.service";

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy){
    constructor( private readonly adminService: AdminService){
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string){
        try{
            const admin = await this.adminService.verifyAdmin(email, password);

            if (!(admin).verified){
                throw new UnauthorizedException("Account verrification required");
            }
            return admin;
        } catch(error){
            throw new UnauthorizedException(error, error.message);
        }
    }
}