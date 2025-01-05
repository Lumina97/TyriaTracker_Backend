import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { RacesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/races Api
 */
export class RacesApi extends ApiBase {
	/**
	 * Returns information on in-game playable races.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information on in-game playable races.
	 *
	 * @param ids - List of race ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof RacesDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof RacesDTO>(endpoints.races.byId, { ids }, RacesDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.races.all, {}, stringArrayType);
	}
}
