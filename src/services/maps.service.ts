import { Map } from "../models/db/map.db";
import { PagedResponseDto } from "../models/dto/api-response.dto";
import { MapsDalc } from "../dalc/maps.dalc";

export class MapsService {
  	public getAll(offset?: number): PagedResponseDto<Map[]> {
		const response: Map[] = [
			{
				id: 1,
				downloadURL: "https://google.co.uk",
				name: "map1",
				hash: "ijahS98DY121!£$£$*t",
				statusFlag: 1,
				type: 2				
			},
			{
				id: 2,	
				downloadURL: "https://bing.co.uk",
				name: "map2",
				hash: "ijah498DY121!£$£$*t",
				statusFlag: 2,
				type: 1		
			}
		]

		return { 
			totalCount: 100,
			returnCount: response.length,
			response: response
		}
	}

	public get(id: number): Map {
		return {
			id: 1,
			downloadURL: "https://google.co.uk",
			name: "map1",
			hash: "ijahS98DY121!£$£$*t",
			statusFlag: 1,
			type: 2
		};
	}
}
