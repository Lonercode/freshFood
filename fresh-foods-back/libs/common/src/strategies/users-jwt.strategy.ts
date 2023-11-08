import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "apps/auth/src/users/users.service";
import { Strategy, ExtractJwt } from 'passport-jwt';

export class UserJwtStrategy extends PassportStrategy(Strategy){
    constructor( configService: ConfigService,
        private readonly usersService: UsersService ){
            super({
                jwtFromExtractors: ExtractJwt.fromExtractors([
                    (request: any) => 
                    request?.cookies?.Authentication || request?.Authentication
                ]),
                secretOrKey: configService.get('JWT_SECRET')
            })
        }
}