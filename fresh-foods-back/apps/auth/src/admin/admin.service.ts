import { Injectable, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { CurrentAdmin } from '@app/common/decorators/current-admin.decorator';
import { Admin } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { getAdminDto } from './dto/get-admin.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AdminService{
    constructor(private readonly adminRepository: AdminRepository){}

    async getAdmin(getAdminDto: getAdminDto){
      return this.adminRepository.findOne(getAdminDto);
    }

    async createAdmin(createAdminDto: CreateAdminDto){
        await this.validateCreateAdminDto(createAdminDto);
    console.log("gets here");
    
    return this.adminRepository.create({
      ...createAdminDto,
      password: await bcrypt.hash(createAdminDto.AdminPassword, 10),
      verified: false,
      otp: null
    });
    }

    private async validateCreateAdminDto(createAdminDto: CreateAdminDto) {
        try {
          await this.adminRepository.findOne({ email: createAdminDto.email });
    
        } catch (error) {
          return; // this is because we don't want to throw any error if a user
          // with said email doesn't exist so our create new user can proceed
        }
    
        throw new UnprocessableEntityException('Email already exists')
      }

      async verifyAdmin(email: string, password: string) {
        const admin = await this.adminRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, admin.password);
    
        if(!passwordIsValid) {
          throw new UnauthorizedException('Credentials are not valid');
        }
    
        return admin;
      }


    async updateAdmin(@CurrentAdmin() _admin: Admin, updateAdminDto: UpdateAdminDto){
        return this.adminRepository.findOneAndUpdate(
            {_admin},
            {$set: updateAdminDto}
        )
    }

    async deleteAdmin(@CurrentAdmin() _admin: Admin){
        return this.adminRepository.findOneAndDelete(_admin);
    }
}