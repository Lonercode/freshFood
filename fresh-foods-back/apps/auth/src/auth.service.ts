import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { tokenPayload } from './interfaces/token-payload.interface';
import { totp } from 'otplib';
import { UsersRepository } from './users/users.repository';
import { Entity } from '@app/common/dto/request-otp.dto';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants';
import { RequestOtpDto, OtpReason } from '@app/common/dto/request-otp.dto';
import { UsersDocument } from '@app/common/models';
import { ClientProxy } from '@nestjs/microservices';
import { VerifyAccountDto } from './dto/account-verification.dto';
import { resetPasswordDto } from './dto/password-reset.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService, 
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy,
    ) {}

  async userLogin(user: UsersDocument, response: Response) {
    const tokenPayload: tokenPayload= {
      userId: user._id.toHexString()
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })
  }

  async requestAccountVerificationOtp({ email, entity, reason }: RequestOtpDto) {
    let requestedBy;

    switch (entity) {
      case Entity.USER:
        const user = await this.usersRepository.findOne({ email });
        if(user?.verified && reason === OtpReason.ACCOUNT_VERIFICATION) {
          throw new HttpException('User already verified', HttpStatus.BAD_REQUEST);
        }
        requestedBy = user?._id.toHexString();
        await this.usersRepository.findOneAndUpdate(
          { _id: user._id },
          { $set: { otp: { requested: true, reason }} },
        );
        break;
    
      case Entity.VENDOR:
        break;

      case Entity.ADMIN:
        break;

      default:
        throw new HttpException('Invalid entity', HttpStatus.BAD_REQUEST);
    }

    const otp = this.generateOtp(requestedBy, email, entity, reason);
    const template = `Use this OTP to verify your buygas account: ${otp}`;

    this.notificationsService.emit('notify_email', {
      email,
      subject: 'Account Verification',
      template,
    });

    return {
      message: 'OTP sent to email',
    }
    
  }

  async requestPasswordResetOtp({ email, entity, reason }: RequestOtpDto) {
    let requestedBy;

    switch (entity) {
      case Entity.USER:
        const user = await this.usersRepository.findOne({ email });
        requestedBy = user?._id.toHexString();
        await this.usersRepository.findOneAndUpdate(
          { _id: user._id },
          { $set: { otp: { requested: true, reason }} },
        );
        break;
    
      case Entity.VENDOR:
        break;

      case Entity.ADMIN:
        break;

      default:
        throw new HttpException('Invalid entity', HttpStatus.BAD_REQUEST);
    }

    const otp = this.generateOtp(requestedBy, email, entity, reason);
    const template = `Use this OTP to complete your password reset: ${otp}`;
    
    this.notificationsService.emit('notify_email', {
      email,
      subject: 'Password Reset',
      template,
    });

    return {
      message: 'OTP sent to email',
    }
  }

  async verifyAccount({ email, otp, entity }: VerifyAccountDto) {
    let requestedBy;
    let isValid;
    let updatedEntity;
    const reason = OtpReason.ACCOUNT_VERIFICATION;

    switch (entity) {
      case Entity.USER:
        const user = await this.usersRepository.findOne({ email, 'otp.requested': true, 'otp.reason': OtpReason.ACCOUNT_VERIFICATION });
        requestedBy = user._id.toHexString();

        if(user.verified) {
          throw new HttpException('User already verified', HttpStatus.BAD_REQUEST);
        }

        isValid = this.validateOtp(otp, requestedBy, email, entity, reason);
        console.log(isValid);
        
        if(!isValid) {
          throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
        }

        updatedEntity = await this.usersRepository.findOneAndUpdate(
          { email },
          { $set: { verified: true, otp: null } },
        );
        break;
      
    
      case Entity.VENDOR:
        break;

      case Entity.ADMIN:
        break;

      default:
        throw new HttpException('Invalid entity', HttpStatus.BAD_REQUEST);
    }

    this.notificationsService.emit('notify_email', {
      email,
      subject: 'Account Verified',
      template: 'Your buygas account has been verified, enjoy the best gas delivery service in Nigeria!',
    });

    return {
      message: 'Account verified',
      data: {
        ...updatedEntity
      }
    }
  }

  async resetPassword({ email, otp, entity, newPassword }: resetPasswordDto) {
    let requestedBy;
    let isValid;
    let updatedEntity;
    const reason = OtpReason.PASSWORD_RESET;

    switch (entity) {
      case Entity.USER:
        const user = await this.usersRepository.findOne({ email, 'otp.requested': true, 'otp.reason': OtpReason.PASSWORD_RESET });
        requestedBy = user._id.toHexString();

        isValid = this.validateOtp(otp, requestedBy, email, entity, reason);
        if(!isValid) {
          throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
        }

        const isPasswordSame = await bcrypt.compare(newPassword, user.password);
        if (isPasswordSame) {
          throw new BadRequestException('New password cannot be the same as old password');
        }

        const password = await bcrypt.hash(newPassword, 10);

        updatedEntity = await this.usersRepository.findOneAndUpdate(
          { email },
          { $set: { password, otp: null } },
        );
        break;
      
    
      case Entity.VENDOR:
        break;

      case Entity.ADMIN:
        break;

      default:
        throw new HttpException('Invalid entity', HttpStatus.BAD_REQUEST);
    }

    this.notificationsService.emit('notify_email', {
      email,
      subject: 'Password Reset',
      template: 'Your buygas account password has been reset, if you did not initiate this action, please contact us immediately!',
    });

    return {
      message: 'Password reset successfully',
      data: {
        ...updatedEntity
      }
    }
  }

  private generateOtp(requestedBy, email, entity, reason) {
    totp.options = { 
      digits: 6,
      step: 60 * 60, // 15 mins
     };
    let secret = this.configService.get('OTP_SECRET');
    secret = `${secret}${requestedBy}${email}${entity}${reason}`;
    return totp.generate(secret);
  }

  private validateOtp(otp, requestedBy,  email, entity, reason) {
    totp.options = { 
      digits: 6,
      step: 60 * 60, // 15 mins
     };
     
    let secret = this.configService.get('OTP_SECRET');

    secret = `${secret}${requestedBy}${email}${entity}${reason}`;

    return totp.check(otp, secret);
  }
}
