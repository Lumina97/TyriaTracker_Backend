import { ApiBase } from '../../base/apiBase';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/worldbosses Api
 */
export class WorldBossesApi extends ApiBase {
	/**
	 * Returns information about scheduled World bosses in Core Tyria that reward boss chests that can be be opened once a day in-game.
	 */
	async get() {
		return await this.buildRequest<typeof stringArrayType>(endpoints.worldBosses, {}, stringArrayType);
	}
}
