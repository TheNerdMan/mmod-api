import { Injectable } from '@nestjs/common';
import { Map } from '@prisma/client';
import { PagedResponseDto } from "../dto/api-response.dto";
import { MapsDalc } from "../dalc/maps.dalc";

@Injectable()
export class MapsService {

  	getAll(skip?: number, take?: number): PagedResponseDto<Map[]> {
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

	get(id: number): Map {
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
