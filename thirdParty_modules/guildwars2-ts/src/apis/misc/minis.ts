import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { MinisDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/minis Api
 */
export class MinisApi extends ApiBase {
	/**
	 * Returns details about minis in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns details about minis in the game.
	 *
	 * @param ids - List of mini ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof MinisDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof MinisDTO>(endpoints.minis.byId, { ids }, MinisDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.minis.all, {}, numberArrayType);
	}
}
