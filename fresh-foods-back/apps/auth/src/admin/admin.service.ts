import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { CurrentAdmin } from '@app/common/decorators/current-admin.decorator';
import { Admin } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService{
    constructor(private readonly adminRepository: AdminRepository){}

    async getAdmin(@CurrentAdmin() _admin: Admin){
        return this.adminRepository.find(_admin);
    }

    async createAdmin(_admin){
        return this.adminRepository.create(_admin);
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