import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AdminService } from "../admin/admin.service";
import { ExtractJwt, Strategy} from "passport-jwt"
import { adminTokenPayload } from "../interfaces/admin-token.payload";
import { UnauthorizedException, Injectable } from "@nestjs/common"

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy){
    constructor( private readonly configService: ConfigService,
        private readonly adminService: AdminService){

            super({
                jwtFromRequest: ExtractJwt.fromExtractors([
                    (request: any) => request?.cookies?.Authentication || request?.Authentication
                ]),
                key: configService.get('JWT_SECRET')
            })
        }

        async validate({adminId} : adminTokenPayload){
            const admin = this.adminService.getAdmin({_id: adminId});
        
            if (!(await admin).verified){
                throw new UnauthorizedException('Account verification required');
        
            }
        
            return admin;
        
        }
}