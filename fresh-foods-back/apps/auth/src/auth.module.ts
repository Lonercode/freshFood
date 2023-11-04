import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './apps/users/src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController, UsersController],
  providers: [AuthService],
})
export class AuthModule {}
