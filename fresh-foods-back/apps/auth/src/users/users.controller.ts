import { Controller, Get, Post, Body, Patch, Delete} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDocument } from '@app/common/models/users.schema';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    constructor( private readonly usersService: UsersService){}

    @Get()
    async getUsers(){
        return this.usersService.getUsers();
    }

    @Post()
    async createUsers (@Body() createUsersDto: CreateUserDto){
        return this.usersService.createUsers(createUsersDto);
    }

    @Patch()
    async updateUsers(@CurrentUser() user: UsersDocument, updateUsersDto: UpdateUsersDto){
        return this.usersService.updateUsers(user, updateUsersDto);
    }

    @Delete()
    async deleteUsers(@CurrentUser() user: UsersDocument){
        return this.usersService.deleteUsers(user);
}

}