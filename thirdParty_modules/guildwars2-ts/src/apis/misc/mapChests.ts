import { ApiBase } from '../../base/apiBase';
import { MapChestsDTO } from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/mapchests Api
 */
export class MapChestsApi extends ApiBase {
	/**
	 * Returns information about Hero's Choice Chests that can be acquired once a day in-game.
	 * NOTE: This endpoint is known to have missing data.
	 */
	async get() {
		return await this.buildRequest<typeof MapChestsDTO>(endpoints.mapChests, {}, MapChestsDTO);
	}
}
