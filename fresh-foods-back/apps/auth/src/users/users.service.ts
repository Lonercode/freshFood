import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { bcrypt } from 'bcryptjs';
import { UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersDocument } from '@app/common/models/users.schema';

@Injectable()
export class UsersService{
    constructor( private readonly usersRepository: UsersRepository,
        usersDocument: UsersDocument){}

    async createUsers(createUserDto: CreateUserDto){
        await this.validateCreateUserDto(createUserDto);
    console.log("gets here");
    
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      verified: false,
      otp: null
    });
    }


    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
          await this.usersRepository.findOne({ email: createUserDto.email });
    
        } catch (error) {
          return; // this is because we don't want to throw any error if a user
          // with said email doesn't exist so our create new user can proceed
        }
    
        throw new UnprocessableEntityException('Email already exists')
      }

      async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
    
        if(!passwordIsValid) {
          throw new UnauthorizedException('Credentials are not valid');
        }
    
        return user;
      }

      async getUsers(){
        return this.usersRepository.find({});
      }

      async deleteUsers(_user){
        return this.usersRepository.findOneAndDelete(_user);
      }

      async updateUsers(_user, updateUsersDto: UpdateUsersDto){
        return this.usersRepository.findOneAndUpdate(
      { _user },
      { $set: updateUsersDto },
    );
        
      }
    
}