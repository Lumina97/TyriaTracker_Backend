import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { FinishersDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/finishers Api
 */
export class FinishersApi extends ApiBase {
	/**
	 * Returns information about finishers that are available in-game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about finishers that are available in-game.
	 *
	 * @param ids - List of finisher ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof FinishersDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof FinishersDTO>(endpoints.finishers.byId, { ids }, FinishersDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.finishers.all, {}, numberArrayType);
	}
}
