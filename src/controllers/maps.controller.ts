import {
	Controller,
	Get,
	Path,
	Query,
	Route,
    Tags
} from "tsoa";
import { Map } from "../models/map.model";
import { PagedResponse } from "../dto/api-response.model";
import { MapsService } from "../services/maps.service";

@Route("maps")
@Tags("Maps")
export class MapsController extends Controller {

    /**
     * Gets all maps.
	 * @param offset Offset this many records (paging).
     * @isInt offset
     * @returns Returns all maps (100 at a time).
     */
	@Get()
	public async GetAllMaps(@Query() offset?: number): Promise<PagedResponse<Map[]>> {
		return new MapsService().getAll(offset);
	}

    /**
     * Gets a specific map.
	 * @param mapID Target map ID.
     * @isInt mapID
     * @returns Returns a single map.
     */
	@Get("{mapID}")
	public async GetMap(@Path() mapID: number): Promise<Map> {
		return new MapsService().get(mapID);
	}
}
