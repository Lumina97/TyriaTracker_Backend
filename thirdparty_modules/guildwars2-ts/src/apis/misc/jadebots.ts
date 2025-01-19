import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { JadebotsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/jadebots Api
 */
export class JadebotsApi extends ApiBase {
	/**
	 * Returns all Jade Bot skins in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns all Jade Bot skins in the game.
	 *
	 * @param ids - Jade bot ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof JadebotsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof JadebotsDTO>(endpoints.jadebots.byId, { ids }, JadebotsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.jadebots.all, {}, numberArrayType);
	}
}
