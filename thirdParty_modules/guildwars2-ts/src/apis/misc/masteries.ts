import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { MasteriesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/masteries Api
 * NOTE: This endpoint is known to have missing or incomplete data
 */
export class MasteriesApi extends ApiBase {
	/**
	 * Returns information about masteries that are available in-game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about masteries that are available in-game.
	 *
	 * @param ids - List of mastery ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof MasteriesDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof MasteriesDTO>(endpoints.masteries.byId, { ids }, MasteriesDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.masteries.all, {}, numberArrayType);
	}
}
