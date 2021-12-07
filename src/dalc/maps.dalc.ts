import { Injectable } from '@nestjs/common';
import { PrismaDalc } from './prisma.dalc';
import {
    Map,
    Prisma
} from '@prisma/client';


@Injectable()
export class MapsDalc {
    constructor(private prisma: PrismaDalc) {}

    /**
     * @summary Inserts to database
     * @returns New db record ID
    */ 
    
    async insert(newMap: Prisma.MapCreateInput): Promise<number> {
        const result = await this.prisma.map.create({
            data: newMap
        });

        return newMap.id;
    }
}
