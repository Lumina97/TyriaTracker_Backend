import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { ItemStatsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/itemstats Api
 */
export class ItemStatsApi extends ApiBase {
	/**
	 * Returns information about itemstats for items that are in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about itemstats for items that are in the game.
	 *
	 * @param ids - List of itemstat ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof ItemStatsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof ItemStatsDTO>(endpoints.itemstats.byId, { ids }, ItemStatsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.itemstats.all, {}, numberArrayType);
	}
}
