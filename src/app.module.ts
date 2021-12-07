import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { MapsController } from './controllers/maps.controller';

import { ServiceModule } from './services/service.module';
import { DalcModule } from './dalc/dalc.module';

@Module({
  imports: [
    ServiceModule,
    DalcModule    
  ],
  controllers: [
    UsersController,
    MapsController
  ],
  providers: [
    ServiceModule,
    DalcModule
  ]
})
export class AppModule {}
