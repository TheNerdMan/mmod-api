import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../services/users.service';
import { appConfig } from 'config/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersService,
    PassportModule,  
    JwtModule.register({
        secret: appConfig.accessToken.secret, signOptions: {
            expiresIn: appConfig.accessToken.expTime,
        },
    }),
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    
  ]
})
export class AuthModule {}
