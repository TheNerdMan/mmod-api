import { Module } from '@nestjs/common';

import { MapsService } from './maps.service';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    MapsService
  ],
  exports: [
    UsersService,
    MapsService
  ]
})
export class ServiceModule {}
