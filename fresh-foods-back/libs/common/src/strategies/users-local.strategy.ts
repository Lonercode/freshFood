import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "apps/auth/src/users/users.service";
import { Strategy } from 'passport-jwt';

export class UsersLocalStrategy extends PassportStrategy(Strategy){
    constructor( private readonly usersService: UsersService ){
        super({usernameField: 'email'});
    }
}