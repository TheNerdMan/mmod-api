import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Map } from '@prisma/client';
import { PagedResponseDto } from "../dto/api-response.dto";
import { MapsService } from "../services/maps.service";

@Controller("maps")
@ApiTags("Maps")
export class MapsController {

	constructor(private readonly mapsService: MapsService) {}

    /**
     * Gets all maps.
	 * @param offset Offset this many records (paging).
     * @isInt offset
     * @returns Returns all maps (100 at a time).
     */
	@Get()
	public async GetAllMaps(@Query()skip?: number, @Query()take?: number): Promise<PagedResponseDto<Map[]>> {
		return this.mapsService.getAll(skip, take);
	}

    /**
     * Gets a specific map.
	 * @param mapID Target map ID.
     * @isInt mapID
     * @returns Returns a single map.
     */
	@Get("{mapID}")
	public async GetMap(@Param() mapID: number): Promise<Map> {
		return this.mapsService.get(mapID);
	}
}
