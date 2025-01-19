import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { LegendaryArmoryDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/legendaryarmory Api
 */
export class LegendaryArmoryApi extends ApiBase {
	/**
	 * Returns information about Legendary Armory items that are available in-game
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about Legendary Armory items that are available in-game
	 *
	 * @param ids - List of legendary armory item ids
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof LegendaryArmoryDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof LegendaryArmoryDTO>(
				endpoints.legendaryArmory.byId,
				{ ids },
				LegendaryArmoryDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.legendaryArmory.all, {}, numberArrayType);
	}
}
