import { User } from '../models/user.model';

export class UserDalc {


    /**
     * @summary Inserts to database
     * @returns New db record ID
    */ 
    
    static insert(newUser: User): number {
        
        // Go do something at database
        newUser.id = Math.floor(Math.random() * 10000); // Random

        return newUser.id;
    }
}
