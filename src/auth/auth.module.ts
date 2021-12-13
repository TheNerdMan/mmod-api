import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../services/users.service';

@Module({
  imports: [
    UsersService,
    PassportModule,    
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
  ]
})
export class AuthModule {}
