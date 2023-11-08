import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schema/admin.schema';
import { CurrentAdmin } from '@app/common/decorators/current-admin.decorator';
import { AdminService } from './admin.service';

@Controller()
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    @Get()
    async getAdmin(@CurrentAdmin() admin: Admin){
        return this.adminService.getAdmin(admin);
    }

    @Post()
    async createAdmin(@Body() createAdminDto: CreateAdminDto){
        return this.adminService.createAdmin(createAdminDto);
    }

    @Patch()
    async updateAdmin(@CurrentAdmin() admin: Admin, updateAdminDto: UpdateAdminDto){
        return this.adminService.updateAdmin(admin, updateAdminDto);
    }

    @Delete()
    async deleteAdmin(@CurrentAdmin() admin: Admin){
        return this.adminService.deleteAdmin(admin);
    }
}