import { ConfigService } from "@nestjs/config";
import { tokenPayload } from "../interfaces/token-payload.interface";
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { UsersService } from "../users/users.service";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor( configService: ConfigService, 
        private usersService: UsersService)

{
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (request: any) => request?.cookies?.Authentication || request?.Authentication
            
        ]),
        key:configService.get('JWT_SECRET'),
    })
}

async validate({userId} : tokenPayload){
    const user = this.usersService.getUser({_id: userId});

    if (!(await user).verified){
        throw new UnauthorizedException('Account verification required');

    }

    return user;

}
}