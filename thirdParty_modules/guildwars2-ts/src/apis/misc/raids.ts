import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { RaidsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/raids Api
 */
export class RaidsApi extends ApiBase {
	/**
	 * Returns information on in-game raids.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information on in-game raids.
	 *
	 * @param ids - Raid ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof RaidsDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof RaidsDTO>(endpoints.raids.byId, { ids }, RaidsDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.raids.all, {}, stringArrayType);
	}
}
