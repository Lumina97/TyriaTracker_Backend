import { ApiBase } from '../../base/apiBase';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/dailycrafting Api
 */
export class DailyCraftingApi extends ApiBase {
	/**
	 * Returns information about time-gated recipes that can be crafted in-game.
	 */
	async get() {
		return await this.buildRequest<typeof stringArrayType>(endpoints.dailyCrafting, {}, stringArrayType);
	}
}
