import { ApiBase } from '../../base/apiBase';
import { BuildDTO } from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/build Api
 */
export class BuildApi extends ApiBase {
	/**
	 * Returns the current build id of the game.
	 * NOTE: This endpoint is broken, and after a certain timestamp, seems to be returning the exact same value.
	 */
	async get() {
		return await this.buildRequest<typeof BuildDTO>(endpoints.build, {}, BuildDTO);
	}
}
