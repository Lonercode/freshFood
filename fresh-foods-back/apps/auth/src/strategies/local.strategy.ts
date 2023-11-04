import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor( private readonly usersService: UsersService){
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string){
        try{
            const user = await this.usersService.verifyUser(email, password);

            if (!(user).verified){
                throw new UnauthorizedException("Account verrification required");
            }
            return user;
        } catch(error){
            throw new UnauthorizedException(error, error.message);
        }
    }
}