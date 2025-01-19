import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { ItemsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/items Api
 */
export class ItemsApi extends ApiBase {
	/**
	 * Returns information about items that were discovered by players in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about items that were discovered by players in the game.
	 *
	 * @param ids - List of item ids
	 */
	async get(ids: number[]): Promise<z.infer<typeof ItemsDTO>>;
	async get(ids?: number[]) {
		if (ids) return await this.buildRequest<typeof ItemsDTO>(endpoints.items.byId, { ids }, ItemsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.items.all, {}, numberArrayType);
	}
}
