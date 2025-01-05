import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { NoveltiesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/novelties Api
 */
export class NoveltiesApi extends ApiBase {
	/**
	 * Returns information about novelties that are available in-game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about novelties that are available in-game.
	 *
	 * @param ids - List of novelty ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof NoveltiesDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof NoveltiesDTO>(endpoints.novelties.byId, { ids }, NoveltiesDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.novelties.all, {}, numberArrayType);
	}
}
