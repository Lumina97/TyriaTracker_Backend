import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { OutfitsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/outfits Api
 */
export class OutfitsApi extends ApiBase {
	/**
	 * Returns information about the outfits that are in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the outfits that are in the game.
	 *
	 * @param ids - List of outfit ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof OutfitsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof OutfitsDTO>(endpoints.outfits.byId, { ids }, OutfitsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.outfits.all, {}, numberArrayType);
	}
}
