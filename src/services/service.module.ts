import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { MapsService } from './maps.service';
import { UsersService } from './users.service';

import { DalcModule } from '../dalc/dalc.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[    
    DalcModule,
    HttpModule,
    AuthModule,
  ],
  providers: [    
    UsersService, 
    MapsService,    
  ],
  exports: [
    UsersService,
    MapsService,
    AuthModule,
  ]
})
export class ServiceModule {}
