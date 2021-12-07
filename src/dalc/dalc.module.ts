import { Module } from '@nestjs/common';

import { PrismaDalc } from './prisma.dalc';
import { MapsDalc } from './maps.dalc';
import { UserDalc } from './users.dalc';

@Module({
  providers: [
    PrismaDalc,
    MapsDalc,
    UserDalc
  ],
  exports: [
    PrismaDalc,
    MapsDalc,
    UserDalc
  ]
})
export class DalcModule {}
