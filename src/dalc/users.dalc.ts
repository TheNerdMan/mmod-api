import { Injectable } from '@nestjs/common';
import { PrismaDalc } from './prisma.dalc';
import {
    User,
    Prisma
} from '@prisma/client';


@Injectable()
export class UserDalc {
    constructor(private prisma: PrismaDalc) {}

    /**
     * @summary Inserts to database
     * @returns New db record ID
    */     
    async Insert(
        newUser: Prisma.UserCreateInput
    ): Promise<number> {

        const result = await this.prisma.user.create({
            data: newUser
        });

        return result.id;
    }

    /**
     * @summary Inserts to database
     * @returns New db record ID
    */     
    async GetAll(
        where?: Prisma.UserWhereInput,
        skip?: number,
        take?: number
    ): Promise<[User[], number]> {
        const count = await this.prisma.user.count({
            where: where,
            skip: skip,
            take: take
        })
        const users = await this.prisma.user.findMany({                    
            where: where,
            skip: skip,
            take: take
        })
        return [users, count]            
    }
}
