import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { LegendsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/legends Api
 */
export class LegendsApi extends ApiBase {
	/**
	 * Returns information about the Revenant Legends that are in the game.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about the Revenant Legends that are in the game.
	 *
	 * @param ids - List of legend ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof LegendsDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof LegendsDTO>(endpoints.legends.byId, { ids }, LegendsDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.legends.all, {}, stringArrayType);
	}
}
