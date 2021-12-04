import { Map } from '../models/db/map.db';

export class MapsDalc {


    /**
     * @summary Inserts to database
     * @returns New db record ID
    */ 
    
    static insert(newMap: Map): number {
        
        // Go do something at database
        newMap.id = Math.floor(Math.random() * 10000); // Random

        return newMap.id;
    }
}
