import { ConfigService } from "@nestjs/config";
import { tokenPayload } from "../interfaces/token-payload.interface";
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor( configService: ConfigService, 
        usersService: UsersService)

{
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (request: any) => request?.cookies?.Authentication || request?.Authentication
            
        ]),
        key:configService.get('JWT_SECRET'),
    })
}

async validate({userId} : tokenPayload){
    const user = usersService.get(_id: userId);

    if (!(await user).verified){
        throw new UnauthorizedException('Account verification required');

    }

    return user;

}
}