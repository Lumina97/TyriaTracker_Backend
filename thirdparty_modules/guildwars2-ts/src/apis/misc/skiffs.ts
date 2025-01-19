import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { SkiffsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/skiffs Api
 */
export class SkiffsApi extends ApiBase {
	/**
	 * Returns all Skiff skins in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns all Skiff skins in the game.
	 *
	 * @param ids - List of skiff ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof SkiffsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof SkiffsDTO>(endpoints.skiffs.byId, { ids }, SkiffsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.skiffs.all, {}, numberArrayType);
	}
}
