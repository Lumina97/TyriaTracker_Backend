import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { GlidersDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/gliders Api.
 */
export class GlidersApi extends ApiBase {
	/**
	 * Returns information about gliders that are available in-game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about gliders that are available in-game.
	 *
	 * @param ids - List of glider ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof GlidersDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof GlidersDTO>(endpoints.gliders.byId, { ids }, GlidersDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.gliders.all, {}, numberArrayType);
	}
}
