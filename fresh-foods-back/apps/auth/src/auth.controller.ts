import { Controller, Get, UseGuards, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDocument } from '@app/common/models';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { localAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(localAuthGuard)
  @Post('userLogin')
  async userLogin(@CurrentUser() user: UsersDocument, @Res({passthrough: true}) response: Response){
    await this.authService.userLogin(user, response);
    response.send(user);
    
  }
}
