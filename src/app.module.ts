import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { MapsController } from './controllers/maps.controller';

import { ServiceModule } from './services/service.module';
import { DalcModule } from './dalc/dalc.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
  imports: [
    HttpModule,
    ServiceModule,
    DalcModule    
  ],
  controllers: [
    AuthController,
    UsersController,
    MapsController
  ],
  providers: [
    ServiceModule,
    DalcModule,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})
export class AppModule {}
