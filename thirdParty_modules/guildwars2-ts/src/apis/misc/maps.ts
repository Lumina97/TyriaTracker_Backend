import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { MapsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/maps Api
 *
 * NOTE: This endpoint is frequently out of sync.
 * Visit https://wiki.guildwars2.com/wiki/API:2/maps for more info
 */
export class MapsApi extends ApiBase {
	/**
	 * Returns details about maps in the game, including details about floor and translation
	 * data on how to translate between world coordinates and map coordinates.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns details about maps in the game, including details about floor and translation
	 * data on how to translate between world coordinates and map coordinates.
	 *
	 * @param ids - List of map ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof MapsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof MapsDTO>(endpoints.maps.byId, { ids }, MapsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.maps.all, {}, numberArrayType);
	}
}
